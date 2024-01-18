"use client"
import { File } from "@prisma/client"
import QuestionFormField from "../QuestionFormField"
import { QuestionState } from "../PassageFormField"
import { v4 } from "uuid"
import FileInputAdmin from "../../form/FileInputAdmin"
import InputAdmin from "../../form/InputAdmin"

const DiagramFormField = ({
  data, image, setImage, updateData, beforeCount
}: {
  data: QuestionState[], image: File | null, setImage: (data: File | null) => void,
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
    <div className="flex flex-wrap -mx-2">
      <div className="w-2/5 px-2 mb-4">
        <FileInputAdmin label="Ảnh" value={image} onChange={(e) => setImage(e.target.value)} details={{tableName: 'quiz'}} />
      </div>
      <div className="w-3/5 px-2 mb-4">
        <QuestionFormField 
          data={data}
          updateData={updateData}
          beforeCount={beforeCount}
          renderItem={(question) => 
            <>
              <InputAdmin 
                label="Question name"
                placeholder="Water runs into a __ used by local people" required
                value={question.questionName || ''} onChange={(e) => handelUpdate(e.target.value, question.id, 'questionName')}
              />

              <InputAdmin 
                label="Answer"
                className="mt-3"
                placeholder="canal" required
                value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id, 'answer')}
              />
            </>
          } 
        />
      </div>
    </div>
  )
}

export default DiagramFormField