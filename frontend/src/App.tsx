import { Outlet } from "react-router";
import "./App.css";
import Header from "./Components/Header";

function App() {
  return (
    <div className="main-div">
      <Header />
      <div className="content-view">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
