import React, { Dispatch, FormEvent, KeyboardEvent, MouseEvent, SetStateAction, useState } from 'react'
import { GroupQuestionState } from '../content/PracticeContent';

const Summary = ({
  groupQuestion, answers, setAnswers
}: {
  groupQuestion: GroupQuestionState,
  answers: {
    questionId: string;
    answer: string;
  }[],
  setAnswers: Dispatch<SetStateAction<{
    questionId: string;
    answer: string;
  }[]>>
}) => {
  const [listContent, setListContent] = useState(groupQuestion.options?.summaryContent.split("__")) || []

  const handelChange = (e: any, id: string) => {
    let value = e.currentTarget.textContent || ''
    setAnswers(state => state.map(v => ({
      ...v,
      answer: v.questionId == id ? value : v.answer
    })))
  }

  return (
    <>
      <div className="mt-4 rounded-xl px-4 py-3 bg-white">
        <p className="text-lg font-semibold">{groupQuestion.options?.summaryTitle}</p>
        <div className="mt-4 leading-10 tracking-wider text-sm">
          { listContent?.map((v,i) => {
            // const answerItem = answers.find(v2 => v2.questionId == groupQuestion.questions[i]?.id)
            return <span key={i}>
              <span className="whitespace-pre-wrap leading-loose">{v}</span>
              
              <span 
                className="choose-answer inline px-4 relative"
              >
                <div className="question !inline-flex">
                  <span>{groupQuestion.questions[i]?.number}</span>
                  <span className="icon !text-sm">arrow_right_alt</span>

                  <div className="input !inline-block !whitespace-normal !ml-3 cursor-text" 
                    contentEditable 
                    onKeyDown={e => e.key == "Enter" && e.preventDefault()}
                    // dangerouslySetInnerHTML={{__html : answerItem?.answer || ''}}
                    onInput={(e) => handelChange(e, groupQuestion.questions[i]?.id)}
                  ></div>
                </div>
              </span>
            </span>
          })}
        </div>
      </div>
    </>
  )
}

export default Summary