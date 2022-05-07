import moment from 'moment';
export const getTimeOptions = () => {
  let options = [];
  options.push('06:00 PM');
  for (let index = 1; index < 12; index++) {
    options.push(
      moment(options[index - 1], 'hh:mm A')
        .add(1, 'hour')
        .format('hh:mm A')
    );
  }
  return options;
};
export const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Some error occured.';
