import { GroupQuestionOptionsState } from "@/components/admin/english/PassageFormField"
import { formatDataEnglishSelect } from "@/components/admin/english/english"
import PracticeContent from "@/components/web/content/PracticeContent"
import db from "@/lib/admin/db"
import { File, QuestionGroup, Passage, Question, Quiz } from "@prisma/client"
import { redirect } from "next/navigation"

export type QuizState = Quiz & {
  passages: (Passage & {
    groupQuestions: (Omit<QuestionGroup, "options"> & {
      image: File | null,
      questions: Question[]
      options: GroupQuestionOptionsState
    })[]
  })[]
}

const getData = async (slug: string) => {
  const data = await db.quiz.findFirst({
    where: {
      slug
    },
    include: {
      passages: {
        include: {
          questionGroups: {
            include: {
              image: true,
              questions: true
            }
          }
        }
      }
    }
  })

  const dataFormat: QuizState | null = data ? {
    ...data,
    passages: formatDataEnglishSelect(data.passages)
  } : null

  return dataFormat
}

const page = async ({
  params: { slug }
}: {
  params: { slug: string } 
}) => {

  const quiz = await getData(slug)

  if (!quiz) {
    redirect('/')
  }

  return (
    <PracticeContent quiz={quiz} />
  )
}

export default page