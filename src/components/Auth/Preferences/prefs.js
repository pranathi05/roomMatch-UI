export const prefs = [
  {
    question: `What is your age`,
    type: 'number',
    name: 'age',
    label: 'Age',
  },
  {
    question: `Where are you from`,
    type: 'text',
    name: 'residence',
    label: 'Residence',
  },

  {
    question: `What is your budget for rent`,
    type: 'range',
    name: 'rent',
    label: 'Rent',
  },
  {
    question: `Preferable Date to move in (days)`,
    type: 'number',
    name: 'joining',
    label: 'Joining Time',
  },
  {
    question: `Are guests allowed`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'guestsAllowed',
    label: 'Guests Allowed',
  },
  {
    question: `Is drinking/smoking allowed`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'smokingAllowed',
    label: 'Drinking / Smoking Allowed',
  },

  {
    question: `What is your ideal location`,
    type: 'text',
    name: 'idealLocation',
    label: 'Ideal Location',
  },
  {
    question: `Are you a student`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'isStudent',
    label: 'Is Student',
  },
  {
    question: `What time do you go to sleep`,
    type: 'select',
    name: 'sleepTime',
    label: 'Sleep Time',
  },
  {
    question: `Do you want to manage your daily meal with your roommate`,
    type: 'radio',
    options: ['Yes', 'No'],
    name: 'mealStatus',
    label: 'Daily Meal Status With Roommate',
  },
];
