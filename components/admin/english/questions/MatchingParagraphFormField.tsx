"use client"

import { v4 } from "uuid"
import { GroupQuestionOptionsState, QuestionState } from "../PassageFormField"
import QuestionFormField from "../QuestionFormField"
import InputAdmin from "../../form/InputAdmin"

const MatchingParagraphFormField = ({
  data, updateData, beforeCount, options, setOptions
}: {
  data: QuestionState[]
  updateData: (data: QuestionState[]) => void,
  beforeCount: number,
  options: GroupQuestionOptionsState,
  setOptions: (data: {options: GroupQuestionOptionsState, questions?: QuestionState[]}) => void,
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

  const handelUpdateOptions = (value: string, id: string) => {
    const newSuggestions = (options?.suggestions || []).map(v => {
      if (v.id == id) {
        return {
          ...v,
          title: value
        }
      }
      return v
    })

    const newData = options ? {...options, suggestions: newSuggestions} : {
      summaryTitle: '',
      summaryContent: '',
      suggestions: newSuggestions
    }

    setOptions({options: newData})
  }

  const handelUpdateSuggestions = (newSuggestions: any[]) => {
    const newData = options ? {...options, suggestions: newSuggestions} : {
      summaryTitle: '',
      summaryContent: '',
      suggestions: newSuggestions
    }

    setOptions({options: newData})
  }

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
      <QuestionFormField label="Nhóm câu gợi ý" 
        className="w-full lg:w-1/2 px-2 mb-4" data={options?.suggestions || []}
        defaultDataCreate={{title: ''}} questionTitle="Câu gợi ý"
        updateData={handelUpdateSuggestions} renderItem={(suggestion) =>
          <InputAdmin 
            label="Suggestion"
            placeholder="suggestion" required
            value={suggestion.title} onChange={(e) => handelUpdateOptions(e.target.value, suggestion.id)}
          />
        } 
      />

      <QuestionFormField 
        label="Nhóm câu trả lời" className="w-full lg:w-1/2 px-2 mb-4" 
        data={data} updateData={updateData} beforeCount={beforeCount} renderItem={(question) =>
          <>
            <InputAdmin 
              label="Question name"
              placeholder="Water runs into a __ used by local people" required
              value={question.questionName || ''} onChange={(e) => handelUpdate(e.target.value, question.id, 'questionName')}
            />
            
            <InputAdmin 
              label="Answer"
              placeholder="canal" required
              value={question.answer?.answerName} onChange={(e) => handelUpdate(e.target.value, question.id, "answer")}
            />
          </>
        } 
      />
    </div>
  )
}

export default MatchingParagraphFormField