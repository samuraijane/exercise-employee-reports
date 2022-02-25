import data from '../mocks/data.json';
import { GET_EMPLOYEE_DATA } from './actionTypes';

export const getEmployeeData = () => {
  return {
    type: GET_EMPLOYEE_DATA,
    payload: {
      data
    }
  }
};