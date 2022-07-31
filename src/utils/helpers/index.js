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

export const getDeptOptions = () => {
  let options = ['Agriculture Engineering', 'Artificial intelligence', 'Artificial intelligence and machine learning', 'Data Science', 'Electrical Engineering', 'Information Technology', 'Mechanical engineering', 'Aeronautical Engineering', 'Automation and Robotics', 'Automation and Robotics', 'Automobile Engineering', 'B. Tech in Cyber security', 'Big Data Analytics', 'Biomedical Engineering', 'Biotechnology Engineering', 'Ceramic Engineering', 'Chemical Engineering', 'Civil Engineering', 'Computer Science and Engineering', 'Construction Engineering', 'Dairy technology', 'Electrical and Electronics Engineering', 'Electronics and Instrumentation Engineering', 'Electronics and communication Engineering', 'Food technology', 'Information Science and engineering', 'Information technology', 'Instrumentation Engineering', 'Instrumentation and Control', 'Marine Engineering', 'Mechatronics', 'Mining Engineering', 'Petroleum Engineering', 'Petroleum Engineering', 'Power Engineering', 'Production engineering', 'Robotics Engineering', 'Smart Manufacturing & Automation', 'Structural Engineering', 'Textile Engineering', 'Transportation Engineering'];
  return options;
}
export const getAptType = () =>{
  let options = ['1bhk','2bhk','3bhk','4bhk','studio'];
  return options;
}

export const getFoodpref = () =>{
  let options = ['Flexible','strictly veg','egg']
  return options;
}