import intro from './lessonIntroQuestions'
import mistake from './lessonMistakeQuestions'
import home from './lessonHomeSortQuestions'

export default function getIntroQuizQuestions() {
  const all = [...intro, ...mistake, ...home]
  const shuffled = all.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 6)
}
