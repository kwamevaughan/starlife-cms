import { useFormValue, set, unset } from 'sanity'
import { useEffect, useRef } from 'react'
import type { StringInputProps } from 'sanity'

export function AutoSlugInput(props: StringInputProps) {
  const { onChange, value, schemaType } = props
  const sourceField = (schemaType?.options as { source?: string })?.source ?? 'title'
  const sourceValue = useFormValue([sourceField]) as string | undefined
  const prevSourceRef = useRef(sourceValue)

  useEffect(() => {
    const slugify = (text: string) =>
      text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')

    const currentSlug = (value as { current?: string } | undefined)?.current
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
