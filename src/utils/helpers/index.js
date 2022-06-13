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
export const getStateOptions = () =>{
  let options = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
  return options;

}
export const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Some error occured.';
