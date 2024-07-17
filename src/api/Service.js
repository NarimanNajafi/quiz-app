// https://opentdb.com/api_category.php
import axiosInstance from './index';

const getCategories = () => axiosInstance.get('/api_category.php');

const createSessionToken = () =>
  axiosInstance.get('/api_token.php', {
    params: {
      command: 'request',
    },
  });

const createQuiz = ({ amount, category, difficulty, token }) =>
  axiosInstance.get('/api.php', {
    params: {
      amount: amount,
      token,
      category: category,
      difficulty: difficulty,
    },
  });

const resetQuiz = ({ token }) =>
  axiosInstance.get('/api_token.php', {
    params: {
      command: 'reset',
      token,
    },
  });

export { getCategories, createSessionToken, createQuiz, resetQuiz };
