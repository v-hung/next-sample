"use client"

import { useEffect } from "react"
import { GroupQuestionOptionsState, QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"
import { v4 } from "uuid"
import InputAdmin from "../../form/InputAdmin"
import TextareaAdmin from "../../form/TextareaAdmin"

const SummaryFormField = ({
  data, updateData, options, setOptions, beforeCount
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void,
  options: GroupQuestionOptionsState,
  setOptions: (data: {options: GroupQuestionOptionsState, questions?: QuestionState[]}) => void,
  beforeCount: number
}) => {

  const handelChangeOptions = (value: string, type: 'title' | 'content') => {
    const newOptions = options ? {
      ...options,
      [type == "title" ? 'summaryTitle' : 'summaryContent']: value
    } : {
      summaryTitle: type == "title" ? value : '',
      summaryContent: type == "content" ? value : '',
      suggestions: []
    }

    setOptions({options: newOptions})
  }

  const handelUpdate = (value: string, id: string) => {
    const newData: QuestionState[] = data.map(v => {
      if (v.id == id) {
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

  const changeQuestion = (longText: string) => {
    let newData = data
    let count = (longText.split("__") || []).length - 1
    
    if (count > data.length) {
      let temp: QuestionState[] = new Array(count - data.length).fill(0).map(v => ({
        id: v4(),
        answer: {
          id: v4(),
          answerName: '',
        },
        questionName: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
      }))

      newData = [...data, ...temp]
    }
    else if (count < data.length) {
      newData = data.filter((v,i) => i < count)
    }

    const newOptions = options ? {...options } : {
      summaryTitle: '',
      summaryContent: '',
      suggestions: []
    }

    setOptions({options: newOptions, questions: newData})
  }

  useEffect(() => {
    if (options?.summaryContent != undefined) {
      changeQuestion(options.summaryContent)
    }
  }, [options?.summaryContent])

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full lg:w-1/2 px-2 mb-4">
        <InputAdmin value={options?.summaryTitle} onChange={(e) => handelChangeOptions(e.target.value, 'title')} label="Summary title" placeholder="Studies on digital screen use" />
        <div className="mt-4">
          <TextareaAdmin rows={10} value={options?.summaryContent} onChange={(e) => handelChangeOptions(e.target.value, 'content')} label="Content"/>
        </div>
        <p className="mt-2 text-xs">Use the __ symbol for the answer position.</p>
      </div>

      <div className="w-full lg:w-1/2 px-2 mb-4">
        <QuestionFormField label="Nhóm câu trả lời" 
          isAdd={false} isDel={false} data={data} updateData={updateData} 
          beforeCount={beforeCount}
          renderItem={(question) =>
            <InputAdmin 
              label="Answer"
              placeholder="canal" required
              value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id)}
            />
          } 
        />
      </div>

    </div>
  )
}

export default SummaryFormField