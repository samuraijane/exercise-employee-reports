import { GET_EMPLOYEE_DATA } from '../actionTypes';

const initialState = {};

function addEmployeeData(state=initialState, action) {
  if (action.type === GET_EMPLOYEE_DATA) {
    return action.payload.data;
  }
  return state;
}

export default addEmployeeData;