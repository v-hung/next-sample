"use client"

import { FC, MouseEvent, ReactNode, SyntheticEvent, memo, useState } from "react"
import { QuestionState } from "./PassageFormField"
import { v4 } from "uuid"
import ButtonAdmin from "../form/ButtonAdmin"
import { Accordion, AccordionContent, AccordionGroup, AccordionTitle } from "@/components/ui/Accordion"

type State = {
  data: any[],
  updateData: (data: any[]) => void,
  label?: string,
  name?: string,
  renderItem: (question: any) => ReactNode,
  isAdd?: boolean,
  isDel?: boolean,
  className?: string,
  beforeCount?: number,
  defaultAnswerValue?: string
  defaultDataCreate?: any,
  questionTitle?: string
}

const QuestionFormField: React.FC<State> = memo(({
  data,
  updateData,
  label = "Nhóm câu hỏi",
  name,
  renderItem,
  isAdd = true,
  isDel = true,
  className,
  beforeCount = 0,
  defaultAnswerValue = '',
  defaultDataCreate,
  questionTitle = 'Câu hỏi'
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  }

  const addToData = (e: MouseEvent) => {
    e.preventDefault()

    const newId = v4()
    let dataCreate = defaultDataCreate ? {
      id: newId,
      ...defaultDataCreate
    } : {
      id: newId,
      answer: {
        id: v4(),
        answerName: defaultAnswerValue,
      },
      questionName: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: ''
    }

    const newData: any[] = [...data, dataCreate]

    updateData(newData)
    setExpanded(`panel-${newId}`)
  }

  const deleteData = (e: MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    updateData(data.filter(v => v.id != id))
  }

  return (
    <div className={className}>
      <p className="text-sm font-medium mb-1 capitalize">{label} <span className="text-red-500">*</span></p>
      <div className="flex flex-col">
        <AccordionGroup>
          { data.map((v,i) => 
            <Accordion key={i} expanded={expanded == `panel-${v.id}`} onChange={(isExpanded) => handleChange(`panel-${v.id}`, isExpanded)}>
              <AccordionTitle>
                <div className="w-full flex justify-between space-x-2 items-center">
                  <span>{questionTitle} {beforeCount + i + 1}</span>
                  { isDel ? <span className="icon text-red-600 cursor-pointer"
                    onClick={(e) => deleteData(e, v.id)}
                  >delete</span> : null }
                </div>
              </AccordionTitle>
              <AccordionContent>
                { renderItem(v) }
              </AccordionContent>
            </Accordion>
          )}
        </AccordionGroup>

        { data.length == 0 && !isAdd
          ? <p className="text-sm text-center">------ Không có câu hỏi nào ------</p>
          : null
        }

        { isAdd
          ? <ButtonAdmin variant="outline" color="white" startIcon="add"
            onClick={(e) => addToData(e)} className={ data.length > 0 ? '!mt-4' : ''}
          >
            <span className="font-semibold">Thêm câu hỏi mới</span>
          </ButtonAdmin>
          : null
        }
      </div>
    </div>
  )
})

export default QuestionFormField