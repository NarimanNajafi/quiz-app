const errors = {
  0: {
    title: 'Success Returned',
    describe: 'Session Tokens will be deleted after 6 hours of inactivity.',
  },
  1: {
    title: 'No Results Could',
    describe:
      "not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)",
  },
  2: {
    title: 'Invalid Parameter',
    describe:
      "Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)",
  },
  3: { title: 'Token Not Found', describe: 'Session Token does not exist.' },
  4: {
    title: 'Token Empty',
    describe:
      'Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.',
  },
};

export default errors;
