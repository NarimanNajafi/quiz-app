import { useQuiz } from './provider/quiz';
import Question from './components/Question';
import Quiz from './components/Quiz';
import Breadcrumb from './components/breadcrumb';

function App() {
  const { sesstionToken, questions } = useQuiz();

  return (
    <>
      <Breadcrumb />
      <div className="min-h-screen flex items-center justify-center mx-auto max-w-screen-xl">
        {!sesstionToken && questions.length === 0 && <Quiz />}
        {sesstionToken && <Question />}
      </div>
    </>
  );
}

export default App;
