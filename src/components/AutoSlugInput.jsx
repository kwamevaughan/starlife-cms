import { useFormValue, set, unset } from 'sanity'
import { useEffect, useRef } from 'react'

export function AutoSlugInput(props) {
  const { onChange, value, schemaType } = props
  const sourceField = schemaType?.options?.source || 'title'
  const sourceValue = useFormValue([sourceField])
  const prevSourceRef = useRef(sourceValue)

  useEffect(() => {
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

    const currentSlug = value?.current
    const prevSlug = prevSourceRef.current ? slugify(prevSourceRef.current) : ''
    
    if (sourceValue && (!currentSlug || currentSlug === prevSlug)) {
      const newSlug = slugify(sourceValue)
      if (newSlug !== currentSlug) {
        onChange(newSlug ? set({ _type: 'slug', current: newSlug }) : unset())
      }
    }
    prevSourceRef.current = sourceValue
  }, [sourceValue, value, onChange])

  return props.renderDefault(props)
}
