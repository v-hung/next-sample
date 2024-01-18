"use client"

import { v4 } from "uuid"
import { QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"
import InputAdmin from "../../form/InputAdmin"

const ShortFormField = ({
  data, updateData, beforeCount
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void, beforeCount: number
}) => {

  const handelUpdate = (value: string, id: string, type: 'questionName' | 'answer') => {
    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
        if (type == 'questionName') {
          return {...v, questionName: value}
        }
        
        return {
          ...v, 
          answer: v.answer ? {
            ...v.answer,
            answerName: value
          } : { id: v4(), answerName: value }
        }
      }
      return v
    })

    updateData(newData)
  }

  return (
    <QuestionFormField data={data} updateData={updateData} beforeCount={beforeCount} renderItem={(question) => 
      <>
        <InputAdmin 
          label="Question name"
          placeholder="What type of mineral were the Dolaucothi mines in Wales built to extract?" required
          value={question.questionName || ''} onChange={(e) => handelUpdate(e.target.value, question.id, "questionName")}
        />

        <InputAdmin 
          label="Answer"
          className="mt-3"
          placeholder="gold" required
          value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id, "answer")}
        />
      </>
    } />
  )
}

export default ShortFormField