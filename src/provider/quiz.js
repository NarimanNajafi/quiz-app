import { createContext, useContext, useEffect, useState } from 'react';
import { createQuiz } from '../api/services';
import { useNotification } from '../components/notifcatin';
import errors from '../mock/errors';
import { resetQuiz as resetQuizService } from '../api/services';

const QuizContext = createContext();

const QuizProvider = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [sesstionToken, setSesstionToken] = useState(null);
  const [answers, setAnswers] = useState({});
  const { onOpen } = useNotification();
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const SESSION_TOKEN = localStorage.getItem('SESSION_TOKEN');
    SESSION_TOKEN && setSesstionToken(SESSION_TOKEN);
  }, [setSesstionToken]);

  const handleSetQuestions = (data, token) => {
    setQuestions(data);
    setCurrentQuestion(0);
    setSesstionToken(token);
  };

  useEffect(() => {
    (async () => {
      const data = JSON.parse(localStorage.getItem('QUIZ_PARAMS') || '{}');
      if (data.token) {
        const resQuiz = await createQuiz({
          amount: data.amount,
          category: data.category,
          difficulty: data.difficulty,
          token: data.token,
        });

        handleSetQuestions(resQuiz.data.results, data.token);
      }
    })();
  }, [setSesstionToken]);

  const handleSetCurrentQuestion = (id) => {
    console.log(id);
    setCurrentQuestion(id);
  };

  const resetQuiz = async () => {
    try {
      setResetLoading(true);
      const res = await resetQuizService({ token: sesstionToken });
      if (res.data.response_code === 0) {
        localStorage.removeItem('SESSION_TOKEN');
        localStorage.removeItem('QUIZ_PARAMS');
        setSesstionToken(null);
      }
      setQuestions([]);
      setCurrentQuestion(null);
      setSesstionToken(null);
      setAnswers({});
      onOpen({
        title:
          res.data.response_code === 0
            ? 'Successfully done'
            : errors[res.data.response_code].title,
        describe:
          res.data.response_code === 0
            ? 'Session Token Reset'
            : errors[res.data.response_code].describe,
        variant: res.data.response_code === 0 ? 'success' : 'error',
      });
    } catch (error) {
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        handleSetQuestions,
        //
        sesstionToken,
        setSesstionToken,
        //
        questions,
        //
        currentQuestion,
        handleSetCurrentQuestion,
        //
        answers,
        setAnswers,
        //
        resetLoading,
        resetQuiz,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

export const useQuiz = () => useContext(QuizContext);
