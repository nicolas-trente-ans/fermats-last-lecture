import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'

let configured = false

function ensureMarkedConfigured() {
  if (configured) return
  marked.setOptions({ gfm: true, breaks: false })
  marked.use(
    markedKatex({
      throwOnError: false,
      nonStandard: true,
    }),
  )
  configured = true
}

export function useMarkdown() {
  ensureMarkedConfigured()

  async function renderMarkdown(markdown: string): Promise<string> {
    return marked.parse(markdown)
  }

  return { renderMarkdown }
}
