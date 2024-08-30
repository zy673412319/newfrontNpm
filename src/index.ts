// import MyComponent from './MyComponent.vue';

import { routineChecker,
  carNoQChecker,
  idCardChecker,
  bankCardChecker,
  cnChecker,
  numChecker,
  passportChecker } from './utils/regularCheck';
import {
  telFormat, firstLetterUpper, dateFormat, beforeDateFormat, 
  calculateDiffTime, getWeek, numFilterThreeCut, digitUppercase,
  changeToChinese, urlToObject,
  uniqueArray,
  uniqueArrayByProperty,
  uniqueArrayAndObject,
  sortArray,
  getLastTime,
  getDateOfWeek
} from './utils/commonMethod'

export { 
  routineChecker,
  carNoQChecker,
  idCardChecker,
  bankCardChecker,
  cnChecker,
  numChecker,
  passportChecker,
  
  telFormat, 
  firstLetterUpper, 
  dateFormat, 
  beforeDateFormat, 
  calculateDiffTime, 
  getWeek, 
  numFilterThreeCut, 
  digitUppercase,
  changeToChinese,
  urlToObject,
  uniqueArray,
  uniqueArrayByProperty,
  uniqueArrayAndObject,
  sortArray,
  getLastTime,
  getDateOfWeek
};
