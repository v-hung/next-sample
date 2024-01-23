"use client"
import { ChangeEvent, FC, MouseEvent, SyntheticEvent, memo, useEffect, useState } from 'react'
import DiagramFormField from './questions/DiagramFormField'
import TrueFalseFormField from './questions/TrueFalseFormField'
import ShortFormField from './questions/ShortFormField'
import SingleFormField from './questions/SingleFormField'
import SummaryFormField from './questions/SummaryFormField'
import YesNoFormField from './questions/YesNoFormField'
import MatchingHeadingFormField from './questions/MatchingHeadingFormField'
import "./custom.css";
import { v4 } from 'uuid'
import { File, QuestionGroup as QuestionGroupDB, Passage, Question, Answer } from '@prisma/client'
import ButtonAdmin from '../form/ButtonAdmin'
import { Accordion, AccordionContent, AccordionGroup, AccordionTitle } from '@/components/ui/Accordion'
import RichTextAdmin from '../form/RichTextAdmin'
import SummaryWithHintFormField from './questions/SummaryWithHintFormField'
import MatchingParagraphFormField from './questions/MatchingParagraphFormField'

export type QuestionGroupTypeState = 'diagram' | 'true-false' | 'short' | 'single' | 'summary' | 'yes-no' | 'matching-heading' | 'summary-with-hint' | 'matching-paragraph'

export type AnswerState = Omit<Answer, 'questionId'> | null

export type QuestionState = Omit<Question, 'groupQuestionId'> & {
  answer: AnswerState
}

export type GroupQuestionOptionsState = {
  summaryTitle: string,
  summaryContent: string,
  suggestions: {
    id: string,
    title: string
  }[]
} | null

type GroupQuestionState = Omit<QuestionGroupDB, 'imageId' | 'passageId' | 'options'> & {
  image: File | null,
  questions: QuestionState[]
  options: GroupQuestionOptionsState
}

type PassageState = Omit<Passage, 'quizId'> & {
  questionGroups: GroupQuestionState[]
}

type State = {
  value: PassageState[],
  label?: string,
  name?: string
  required?: boolean,
  defaultValue?: string,
  placeholder?: string,
  onChange?: (data: any) => void
  className?: string
}

const PassageFormField: FC<State> = memo(({
  value,
  label,
  name,
  required = false,
  defaultValue,
  onChange,
  className,
  placeholder
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string, isExpanded: boolean) => {
    console.log({isExpanded, panel})
    setExpanded(isExpanded ? panel : false);
  }
  
  const addToData = () => {
    const newId = v4()
    const newData = [...value, {
      id: newId,
      title: 'Đoạn văn ' + (value.length + 1),
      content: '',
      questionGroups: [],
    }]

    const syntheticEvent: any = {
      target: {
        value: newData
      },
    }

    onChange?.(syntheticEvent)
    setExpanded(`panel-${newId}`)
  }

  const updateData = (data: GroupQuestionState[], id: string) => {
    const newData = value.map((v,i) => {
      if (v.id == id) {
        return {
          ...v,
          questionGroups: data
        }
      }
      return v
    })

    const syntheticEvent: any = {
      target: {
        value: newData
      },
    }

    onChange?.(syntheticEvent)
  }

  const handelChangeContent = (data: string, id: string) => {
    const newData = value.map((v,i) => {
      if (v.id == id) {
        return {
          ...v,
          content: data
        }
      }
      return v
    })

    const syntheticEvent: any = {
      target: {
        value: newData
      },
    }

    onChange?.(syntheticEvent)
  }

  const handelDeleteItem = (e: MouseEvent, id: string) => {
    const newData = value.filter(v => v.id != id)

    const syntheticEvent: any = {
      target: {
        value: newData
      },
    }

    onChange?.(syntheticEvent)
  }

  const findQuestionBeforeCount = (id: string) => {
    let count = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i].id == id) {
        break
      }

      count += value[i].questionGroups.reduce((pre2, cur2) => {
        return pre2 += cur2.questions.length
      }, 0)
    }
    return count
  }

  return (
    <div className={className}>
      { label
        ? <p className="text-sm font-medium mb-1 capitalize">{label} { required && <span className="text-red-500">*</span> }</p>
        : null
      }
      {/* <input type="hidden" name={name} value={JSON.stringify(data)} /> */}
      <div className="border rounded flex flex-col">
        <AccordionGroup>
          { value.map((v,i) =>
            <Accordion key={i} expanded={expanded == `panel-${v.id}`} onChange={(isExpanded) => handleChange(`panel-${v.id}`, isExpanded)}>
              <AccordionTitle renderItem={(active) =>
                <div className="w-full flex space-x-3 items-center justify-between">
                  <span className='flex-grow min-w-0'>{v.title}</span>
                  { active
                    ? <span className="flex-none icon text-red-500"
                      onClick={(e) => handelDeleteItem(e, v.id)}
                    >delete</span>
                    : null
                  }
                </div>
              } />
              <AccordionContent>
                <div className="mb-4">
                  <RichTextAdmin value={v.content} onChange={(e) => handelChangeContent(e.target.value, v.id)} />
                </div>
                <GroupQuestion beforeCount={findQuestionBeforeCount(v.id)} data={v.questionGroups} updateData={(data) => updateData(data, v.id)} />
              </AccordionContent>
            </Accordion>
          )}
        </AccordionGroup>

        <ButtonAdmin 
          variant='outline' startIcon='add' 
          className='!m-4'
          onClick={() => addToData()}
        >
          <span className="font-semibold">Thêm đoạn văn mới</span>
        </ButtonAdmin>
      </div>
    </div>
  )
})

type QuestionTypeMap = {
  type: QuestionGroupTypeState;
  label: string;
  component: FC<{
    data: any, updateData: (data: QuestionState[]) => void
    beforeCount: number,
  }> | FC<{
    data: any, updateData: (data: QuestionState[]) => void, 
    beforeCount: number,
    image: File | null, setImage: (data: File | null) => void,
  }> | FC<{
    data: any, updateData: (data: QuestionState[]) => void,
    beforeCount: number,
    options: GroupQuestionOptionsState,
    setOptions: (data: {options: GroupQuestionOptionsState, questions?: QuestionState[]}) => void
  }>
}

const GroupQuestion = memo(({
  data, updateData, beforeCount
}: {
  data: GroupQuestionState[],
  beforeCount: number,
  updateData: (data: GroupQuestionState[]) => void
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string, isExpanded: boolean) => {
    console.log({isExpanded, panel})
    setExpanded(isExpanded ? panel : false);
  }

  const questionGroupListAdd: QuestionTypeMap[] = [
    { type: 'diagram', label: 'Diagram Label Completion', component: DiagramFormField },
    { type: 'true-false', label: 'True / False / Not given', component: TrueFalseFormField },
    { type: 'short', label: 'Short Answer', component: ShortFormField },
    { type: 'single', label: 'Single Answer', component: SingleFormField },
    { type: 'summary', label: 'Summary, Note Completion', component: SummaryFormField },
    { type: 'summary-with-hint', label: 'Summary, Note Completion With Hint', component: SummaryWithHintFormField },
    { type: 'yes-no', label: 'Yes / No / Not Given', component: YesNoFormField },
    { type: 'matching-heading', label: 'Matching Heading', component: MatchingHeadingFormField },
    { type: 'matching-paragraph', label: 'Matching Paragraph', component: MatchingParagraphFormField }
  ]

  const [showAdd, setShowAdd] = useState(false)

  const addToData = (e: MouseEvent, type: QuestionGroupTypeState) => {
    e.preventDefault()

    const titleGroupQuestion = questionGroupListAdd.find(v => v.type == type)?.label || 'Nhóm câu hỏi'

    const newId = v4()
    const newData: GroupQuestionState[] = [...data, {
      id: newId,
      title: titleGroupQuestion,
      type: type,
      image: null,
      options: {
        suggestions: [],
        summaryContent: '',
        summaryTitle: ''
      },
      questions: []
    }]

    updateData(newData)

    setExpanded(`panel-${newId}`)
    setShowAdd(false)
  }

  const handelDeleteGroup = (e: MouseEvent, id: string) => {
    e.preventDefault()
    const newData = data.filter(v => v.id != id)

    updateData(newData)
  }

  const handelChangeTitle = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    e.preventDefault()

    const newData = data.map(v => {
      if (v.id == id) {
        return {...v, title: e.target.value}
      }
      return v
    })

    updateData(newData)
  }

  const handelChangeImage = (image: File | null, id: string) => {
    const newData = data.map(v => {
      if (v.id == id) {
        return {...v, image: image}
      }
      return v
    })

    updateData(newData)
  }

  const handelChangeOptions = ({ options, questions, id }:{
    options: GroupQuestionOptionsState, id: string, questions?: QuestionState[]
  }) => {
    const newData = data.map(v => {
      if (v.id == id) {
        return {...v, 
          options: options,
          questions: questions ? questions : v.questions
        }
      }
      return v
    })

    updateData(newData)
  }

  const handelUpdateQuestion = (questions: QuestionState[], id: string) => {
    const newData = data.map(v => {
      if (v.id == id) {
        return {...v, questions: questions}
      }
      return v
    })

    updateData(newData)
  }

  const findQuestionBeforeCount = (id: string) => {
    let count = beforeCount
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        break
      }
      count += data[i].questions.length
    }
    return count
  }

  return (
    <div>
      <p className="text-sm font-medium mb-2 capitalize">Nhóm câu hỏi <span className="text-red-600">*</span></p>
      <div className="list-rounded-2 flex flex-col">
        <AccordionGroup>
          { data.map((v,i) => {
            const Component = questionGroupListAdd.find(v2 => v2.type == v.type)?.component
            
            return <Accordion key={i} expanded={expanded == `panel-${v.id}`} onChange={(isExpanded) => handleChange(`panel-${v.id}`, isExpanded)}>
              <AccordionTitle className='py-2' renderItem={(active) => 
                <div className={`w-full flex space-x-3 items-center justify-between ${active ? 'border-b pb-2 mb-2' : ''}`}>
                  <input type="text" value={v.title} onChange={(e) => handelChangeTitle(e, v.id)} className='flex-grow min-w-0 border-none focus:ring-0' />
                  { active
                    ? <span className="flex-none icon text-red-500"
                      onClick={(e) => handelDeleteGroup(e, v.id)}
                    >delete</span>
                    : null
                  }
                </div>
              }>
              </AccordionTitle>
              <AccordionContent>
                { Component 
                  ? <Component data={v.questions} 
                    updateData={(data) => handelUpdateQuestion(data, v.id)} 
                    image={v.image} 
                    setImage={(image) => handelChangeImage(image, v.id)} 
                    beforeCount={findQuestionBeforeCount(v.id)}
                    options={v.options}
                    setOptions={({options, questions}) => handelChangeOptions({options, questions, id: v.id})}
                  /> 
                  : null
                }
              </AccordionContent>
            </Accordion>
          })}
        </AccordionGroup>

        { data.length == 0 
          ? <p className='text-sm text-center'>------------------ Chưa có câu hỏi nào ------------------</p>
          : null
        }

        <div className="flex flex-col justify-center items-center mt-4">
          <div className={`w-full grid gap-2 ${!showAdd ? '!hidden' : 'mb-4'}`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))' }}>
            { questionGroupListAdd.map(v => 
              <button 
                key={v.type}
                className="flex flex-col items-center justify-center border p-2 rounded group cursor-pointer bg-gray-100 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-600"
                onClick={(e) => addToData(e, v.type)}
              >
                <span className="icon w-10 h-10 p-1 rounded-full bg-gray-200 group-hover:bg-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 10V7c0-1.103-.897-2-2-2h-3c0-1.654-1.346-3-3-3S8 3.346 8 5H5c-1.103 0-2 .897-2 2v4h1a2 2 0 0 1 0 4H3v4c0 1.103.897 2 2 2h4v-1a2 2 0 0 1 4 0v1h4c1.103 0 2-.897 2-2v-3c1.654 0 3-1.346 3-3s-1.346-3-3-3z"></path></svg>
                </span>
                <span className="mt-2 text-xs text-center">{v.label}</span>
              </button>
            )}
          </div>

          <ButtonAdmin 
            startIcon={showAdd ? 'close' : 'add'}
            onClick={() => setShowAdd(state => !state)}
          >{showAdd ? 'Hủy bỏ' : 'Thêm nhóm câu hỏi mới'}</ButtonAdmin>
        </div>
      </div>
    </div>
  )
})

export default PassageFormField