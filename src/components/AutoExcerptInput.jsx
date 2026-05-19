import { useFormValue, set, unset } from 'sanity'
import { useEffect, useRef } from 'react'

function blocksToText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map((child) => child.text).join('')
    })
    .filter(Boolean)
    .join('\n\n')
}

function getExcerpt(body) {
  const text = blocksToText(body).trim()
  if (!text) return ''
  if (text.length <= 160) return text
  // Cut at 160 characters and find the last space to avoid cutting a word in half
  const truncated = text.substring(0, 160)
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 120) {
    return truncated.substring(0, lastSpace) + '...'
  }
  return truncated + '...'
}

export function AutoExcerptInput(props) {
  const { onChange, value } = props
  const body = useFormValue(['body'])
  const prevBodyRef = useRef(body)

  useEffect(() => {
    const currentExcerpt = value
    const prevGenerated = prevBodyRef.current ? getExcerpt(prevBodyRef.current) : ''

    // Only auto-generate if current excerpt is empty OR if it matches what we automatically generated last time from the body.
    if (body && (!currentExcerpt || currentExcerpt === prevGenerated)) {
      const newExcerpt = getExcerpt(body)
      if (newExcerpt !== currentExcerpt) {
        onChange(newExcerpt ? set(newExcerpt) : unset())
      }
    }
    prevBodyRef.current = body
  }, [body, value, onChange])

  return props.renderDefault(props)
}
