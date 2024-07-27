import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";


function App() {

  

  return (
    <>
      <div className="max-w-full min-h-full box-border">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
