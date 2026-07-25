import type { Question } from '@/models'

export function normalizeMatchAnswer(value: string): string {
  return value.trim().toLowerCase().normalize('NFKC').replace(/\s+/g, '')
}

export function isCorrectAnswer(question: Question, userAnswer: string): boolean {
  if (question.type === 'mc') {
    return userAnswer === question.answer
  }
  const accepted = question.answer.split('|').map(normalizeMatchAnswer)
  return accepted.includes(normalizeMatchAnswer(userAnswer))
}
