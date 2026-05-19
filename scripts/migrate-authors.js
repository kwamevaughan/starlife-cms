import { getCliClient } from 'sanity/cli'

const client = getCliClient().withConfig({
  apiVersion: '2026-05-19',
})

const slugify = (text) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

async function migrate() {
  console.log('Fetching posts with string authors...')
  
  // Fetch posts where author is defined
  const posts = await client.fetch('*[_type == "post" && defined(author)]')
  
  console.log(`Found ${posts.length} posts. Checking for string values...`)
  
  let migratedCount = 0
  
  for (const post of posts) {
    if (typeof post.author === 'string') {
      const authorName = post.author.trim()
      if (!authorName) continue
      
      const authorSlug = slugify(authorName)
      const authorId = `author-${authorSlug}`
      
      console.log(`Migrating post "${post.title}": changing author "${authorName}" to reference...`)
      
      // 1. Create the author document if it doesn't exist
      await client.createIfNotExists({
        _id: authorId,
        _type: 'author',
        name: authorName,
        slug: {
          _type: 'slug',
          current: authorSlug,
        },
      })
      
      // 2. Patch the post to use a reference
      await client.patch(post._id)
        .set({
          author: {
            _type: 'reference',
            _ref: authorId,
          },
        })
        .commit()
      
      console.log(`Successfully migrated post "${post.title}" to author reference "${authorId}".`)
      migratedCount++
    }
  }
  
  console.log(`Migration finished. Migrated ${migratedCount} posts.`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
