import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

type Props = {
  data: SerializedEditorState | null | undefined
  className?: string
}

export function RichTextContent({ data, className }: Props) {
  if (!data) return null
  return <RichText className={className} data={data} />
}
