import { useState } from 'react';
import { getCategories, createSessionToken, createQuiz } from '../api/services';
import useFetch from '../hooks/UseFetch';
import { useNotification } from './notifcatin';
import errors from '../mock/errors';
import cn from 'classnames';
import Loading from './Loading';
import { useQuiz } from '../provider/quiz';
import Alert from './Alert';

const initialValues = {
  count: 10,
  category: '0',
  difficulty: '0',
};

export default function Quiz() {
  const [values, setValues] = useState(initialValues);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { handleSetQuestions } = useQuiz();

  const { response, loading, error } = useFetch(getCategories);
  const { onOpen } = useNotification();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  };

  const onCountChange = (e) => {
    const { name, value, validity } = e.target;
    setValues((s) => ({
      ...s,
      [name]: validity.valid ? value : s.count,
    }));
  };

  const onSubmit = async () => {
    try {
      setSubmitLoading(true);
      const res = await createSessionToken();

      localStorage.setItem('SESSION_TOKEN', res.data.token);
      localStorage.setItem(
        'QUIZ_PARAMS',
        JSON.stringify({
          amount: values.count,
          category: values.category,
          difficulty: values.difficulty,
          token: res.data.token,
        })
      );

      const resQuiz = await createQuiz({
        amount: values.count,
        category: values.category,
        difficulty: values.difficulty,
        token: res.data.token,
      });
      handleSetQuestions(resQuiz.data.results, res.data.token);

      if (res.data.response_message) {
        onOpen({
          title: res.data.response_message,
          describe: errors[res.data.response_code].describe,
          variant: res.data.response_code !== 0 ? 'error' : 'success',
        });
      }

      setValues(initialValues);
    } catch (error) {
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'w-96 relative border border-gray-200 p-4 rounded-lg bg-white shadow-md',
        {
          'opacity-75 pointer-events-none': loading,
        }
      )}
    >
      <h1 className="text-2xl mb-8 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Setup Quiz
      </h1>
      <div className="isolate -space-y-px rounded-md shadow-sm">
        <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-primary-600">
          <label
            htmlFor="count"
            className="block text-xs font-medium text-gray-900"
          >
            Number Of Questions
          </label>
          <input
            type="text"
            pattern="[0-9]*"
            value={values.count}
            onChange={onCountChange}
            name="count"
            id="count"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="10"
          />
        </div>
        <div className="relative px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-primary-600">
          <label
            htmlFor="categ"
            className="block text-xs font-medium text-gray-900"
          >
            Category
          </label>
          <select
            value={values.category}
            name="category"
            id="categ"
            className="block w-full border-0 py-1.5 pl-0 text-gray-900 sm:text-sm sm:leading-6"
            onChange={onChange}
          >
            {response?.trivia_categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-primary-600">
          <label
            htmlFor="diff"
            className="block text-xs font-medium text-gray-900"
          >
            Difficulty
          </label>
          <select
            value={values.difficulty}
            name="difficulty"
            id="diff"
            className="block w-full border-0 py-1.5 pl-0 text-gray-900 sm:text-sm sm:leading-6"
            onChange={onChange}
          >
            <option value="0">Easy</option>
            <option value="1">Medium</option>
            <option value="2">Hard</option>
          </select>
        </div>
      </div>
      <button
        onClick={onSubmit}
        type="button"
        className="w-full mt-4 rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        {submitLoading ? 'Loading...' : 'Start'}
      </button>
      <Alert title={error} />
      <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading loading={loading} />
      </div>
    </div>
  );
}
