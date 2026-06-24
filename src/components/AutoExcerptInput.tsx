import { useFormValue, set, unset } from 'sanity'
import { useEffect, useRef } from 'react'
import type { TextInputProps } from 'sanity'

type Block = {
  _type: string
  children?: { text: string }[]
}

function blocksToText(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return (blocks as Block[])
    .map((block) => {
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map((child) => child.text).join('')
    })
    .filter(Boolean)
    .join('\n\n')
}

function getExcerpt(body: unknown): string {
  const text = blocksToText(body).trim()
  if (!text) return ''
  if (text.length <= 160) return text
  const truncated = text.substring(0, 160)
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 120) return truncated.substring(0, lastSpace) + '...'
  return truncated + '...'
}

export function AutoExcerptInput(props: TextInputProps) {
  const { onChange, value } = props
  const body = useFormValue(['body'])
  const prevBodyRef = useRef(body)

  useEffect(() => {
    const currentExcerpt = value
    const prevGenerated = prevBodyRef.current ? getExcerpt(prevBodyRef.current) : ''

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
