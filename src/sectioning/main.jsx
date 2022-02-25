import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeData } from "../redux/actions";
import {
  findHRAdmins,
  findSalariesOver70k,
  findHighestITSalary,
  findAverageHRSalary
} from '../utils';

const Main = () => {

  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees);

  const [allEmployees, setAllEmployees] = useState(null);
  const [hrAdmins, setHRAdmins] = useState(null);
  const [sales70k, setsales70k] = useState(null);
  const [highestIT, sethighestIT] = useState(null);
  const [avgHRSalary, setavgHRSalary] = useState(null);

  const createEmployeeList = () => {
    if (employees && employees.HR && employees.HR.length) {
      return [...employees.HR, ...employees.IT, ...employees.Sales];
    }
    return [];
  };

  // this is not very efficient and not something that will scale well but when working
  // under a time constraint like we are in class, it is acceptable
  const resetDeselectedStates = activeStateName => {
    if (activeStateName === 'getData') {
      setHRAdmins(null);
      setsales70k(null);
      sethighestIT(null);
      setavgHRSalary(null);
    } else if (activeStateName === 'hrAdmins') {
      setAllEmployees(null);
      setsales70k(null);
      sethighestIT(null);
      setavgHRSalary(null);
    } else if (activeStateName === 'sales70k') {
      setAllEmployees(null);
      setHRAdmins(null);
      sethighestIT(null);
      setavgHRSalary(null);
    } else if (activeStateName === 'highestIT') {
      setAllEmployees(null);
      setHRAdmins(null);
      setsales70k(null);
      setavgHRSalary(null);
    } else if (activeStateName === 'avgHRSalary') {
      setAllEmployees(null);
      setHRAdmins(null);
      setsales70k(null);
      sethighestIT(null);
    }
  };

  useEffect(() => {
    setAllEmployees(createEmployeeList());
  }, [employees]);

  const handleClick = type => {
    switch(type) {
      case 'getData':
        if (allEmployees && allEmployees.length < 1) {
          dispatch(getEmployeeData());
        } else {
          setAllEmployees(createEmployeeList());
        }
        resetDeselectedStates('getData');
        break;
      case 'hrAdmins':
        const _hrAdmins = findHRAdmins(employees);
        setHRAdmins(_hrAdmins);
        resetDeselectedStates('hrAdmins');
        break;
      case 'sales70k':
        const _sales70k = findSalariesOver70k(employees);
        setsales70k(_sales70k);
        resetDeselectedStates('sales70k');
        break;
      case 'highestIT':
        const _highestIT = findHighestITSalary(employees);
        sethighestIT(_highestIT);
        resetDeselectedStates('highestIT');
        break;
      case 'avgHRSalary':
        const _avgHRSalary = findAverageHRSalary(employees);
        setavgHRSalary(_avgHRSalary);
        resetDeselectedStates('avgHRSalary');
        break;
      default:
        console.error('Houston we have a problem');
    }
  };

  return (
    <main className="y-wrap">
      <div className="report-block">
        <div className="report-block__buttons">
          <button onClick={() => handleClick('getData')}>Get Data</button>
          <button onClick={() => handleClick('hrAdmins')}>HR Admins</button>
          <button onClick={() => handleClick('sales70k')}>Sales 70k+</button>
          <button onClick={() => handleClick('highestIT')}>Hightest IT</button>
          <button onClick={() => handleClick('avgHRSalary')}>Avg HR Salary</button>
        </div>
        <div className="report-block__report">
          {allEmployees && allEmployees.length > 0 && (
            <ul className="report-block__employee-list">
              {allEmployees.map((employee, index) => <li key={index}>{employee.name} / {employee.occupation} </li>)}
            </ul>
          )}
          {hrAdmins && <p>{hrAdmins.map((x, i) => <li key={i}>{x}</li>)}</p>}
          {sales70k && <p>{sales70k.map((x, i) => <li key={i}>{x}</li>)}</p>}
          {highestIT && <p>{highestIT}</p>}
          {avgHRSalary && <p>{avgHRSalary}</p>}
        </div>
      </div>
    </main>
  )
};

export default Main;