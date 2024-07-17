import React, { useState } from 'react';
import { useQuiz } from '../Provider/quiz';
import Modal from './modal';

const Question = () => {
  const { currentQuestion, questions, setAnswers, handleSetCurrentQuestion } =
    useQuiz();
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestion];

  const correct_answers = React.useMemo(() => {
    return [question?.correct_answer, ...(question?.incorrect_answers || [])]
      .filter(Boolean)
      .sort(() => 0.5 - Math.random());
  }, [currentQuestion, question]);

  const onSelectAnswer = (answer) => {
    setAnswers((s) => ({
      ...s,
      [currentQuestion]: question?.correct_answer === answer,
    }));

    if (currentQuestion + 1 < questions.length) {
      handleSetCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion + 1 === questions.length) {
      setIsFinished(true);
    }
  };

  return (
    <>
      <div
        className={
          'max-w-3xl w-full relative border border-gray-200 rounded-lg bg-white shadow-md'
        }
      >
        <div className="p-4 pb-6 min-h-[400px] h-full flex flex-col justify-between">
          <h1
            className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight text-center mb-12"
            dangerouslySetInnerHTML={{ __html: question?.question }}
          />
          <div className="grid mt-auto grid-cols-2 gap-2 max-w-xl mx-auto w-full">
            {correct_answers.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => onSelectAnswer(item)}
                className="rounded-md w-full bg-slate-500 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pribg-slate-500"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal open={isFinished} onClose={() => setIsFinished(false)} />
    </>
  );
};

export default Question;
