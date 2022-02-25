import { useDispatch } from "react-redux";
import { getEmployeeData } from "../redux/actions";

const Main = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getEmployeeData());
  };

  return (
    <main className="y-wrap">
      <button onClick={handleClick}>Get Data</button>
    </main>
  )
};

export default Main;