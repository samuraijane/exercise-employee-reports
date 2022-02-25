import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeData } from "../redux/actions";

const Main = () => {

  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees);

  const [allEmployees, setAllEmployees] = useState(null);

  const createEmployeeList = () => {
    if (employees && employees.HR && employees.HR.length) {
      return [...employees.HR, ...employees.IT, ...employees.Sales];
    }
    return [];
  }

  useEffect(() => {
    setAllEmployees(createEmployeeList());
  }, [employees]);

  const handleClick = type => {
    switch(type) {
      case 'getData':
        dispatch(getEmployeeData());
        break;
      case 'hrAdmins':
        // do something here
        break;
      case 'sales70k':
        // do something here
        break;
      case 'highestIT':
        // do something here
        break;
      case 'avgHRSalary':
        // do something here
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
        </div>
      </div>
    </main>
  )
};

export default Main;