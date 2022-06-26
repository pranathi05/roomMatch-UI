export const prefs = [
  {
    question: `Age`,
    type: 'number',
    name: 'age',
    label: 'Age',
  },
  {
    question: `Gender`,
    type:'radio',
    options: ['Female', 'Male','Other'],
    name: 'gender',
    label: 'Gender',
  },
  {
    question: `Property Location`,
    type: 'text',
    name: 'residence',
    label: 'Residence',
  },
  
  {
    question: `Budget for rent`,
    type: 'range',
    name: 'rent',
    label: 'Rent',
  },
  {
    question: `Available from (number of days)`,
    type: 'number',
    name: 'joining',
    label: 'Joining Time',
  },
  {
    question: `Guests`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'guestsAllowed',
    label: 'Guests Allowed',
  },
  {
    question: `Drinking/Smoking allowed`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'smokingAllowed',
    label: 'Drinking / Smoking Allowed',
  },
  {
    question: `Student`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'isStudent',
    label: 'Is Student',
  },

  {
    question: `Do you want to manage your daily meal with your roommate`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'mealStatus',
    label: 'Daily Meal Status With Roommate',
  },
  {
    question: `What is your ideal location`,
    type: 'text',
    name: 'idealLocation',
    label: 'Ideal Location',
  },

  {
    question: `Sleep Time`,
    type: 'select',
    name: 'sleepTime',
    label: 'Sleep Time',
  }
];
