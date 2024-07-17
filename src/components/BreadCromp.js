import { useQuiz } from '../provider/quiz';
import { HomeIcon } from '../icons';
import classNames from 'classnames';
import Loading from './loading';
import Skeleton from './skeleton';

export default function Breadcrumb() {
  const {
    sesstionToken,
    resetQuiz,
    resetLoading,
    questions,
    currentQuestion,
    answers,
  } = useQuiz();

  const pages = [
    sesstionToken && {
      name: `Quiz <span style='color:rgb(202 138 4 / var(--tw-bg-opacity))'>${sesstionToken?.slice(
        0,
        6
      )}</span>`,
      current: questions?.length === 0 && !!sesstionToken,
    },
    sesstionToken && {
      name: `Question <span style='color:rgb(202 138 4 / var(--tw-bg-opacity))'><b>${
        currentQuestion + 1
      }</b>/</span>${questions?.length}`,
      current: sesstionToken && questions?.length > 0,
      skeletonProps: {
        show: sesstionToken && questions.length === 0,
        className: 'ml-4 h-5 w-[100px]',
      },
    },
  ].filter(Boolean);

  return (
    <nav
      className="flex items-center fixed top-4 w-full"
      aria-label="Breadcrumb"
    >
      <ol role="list" className="ml-1.5 flex space-x-4 px-6">
        <li className="flex">
          <div
            onClick={sesstionToken ? resetQuiz : undefined}
            className={classNames(
              'flex items-center text-gray-400 hover:text-gray-500',
              { 'cursor-pointer': !!sesstionToken }
            )}
          >
            {resetLoading ? (
              <Loading Loading={resetLoading} />
            ) : (
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            )}
            <span className="sr-only">Home</span>
          </div>
        </li>
        {pages.map(({ skeletonProps, ...page }) => {
          return (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-6 flex-shrink-0 text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Skeleton {...skeletonProps}>
                  <span
                    className="text-sm font-medium block w-[91px] text-gray-500 hover:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: page?.name }}
                  />
                </Skeleton>
              </div>
            </li>
          );
        })}
      </ol>
      <Skeleton
        show={sesstionToken && questions.length === 0}
        className="ml-auto mr-4 text-green-700 h-6 w-[160px]"
      >
        {sesstionToken && (
          <div>
            Correct Answers {Object.values(answers).filter(Boolean).length}/
            {questions.length}
          </div>
        )}
      </Skeleton>
    </nav>
  );
}
