import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SelectPage from "../pages/SelectPage";
import Login from "../pages/Login";
import Books from "../pages/Books";
import Journals from "../pages/Journals";
import Guides from "../pages/Guides";
import Dashboard from "../pages/Dashboard";
import LibrarianPage from "../pages/LibrarianPage";
import Confirmation from "../pages/ConfirmPage";
import './App.css'
import './index.css';
import Magazines from "../pages/Magazines";
import Dictionaries from "../pages/Dictionaries";
import Reserves from "../pages/Reserves";
//Other imports... from folders

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/select" element={<SelectPage/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
          <Route path="/books" element={<Books/>} ></Route>
          <Route path="/journals" element={<Journals/>} ></Route>
          <Route path="/guides" element={<Guides/>} ></Route>
          <Route path="/magazines" element={<Magazines/>} ></Route>
          <Route path="/dictionaries" element={<Dictionaries/>} ></Route>
          <Route path="/reserves" element={<Reserves/>} ></Route>
          <Route path="/dashboard" element={<Dashboard/>} ></Route>
          <Route path="/librarian" element={<LibrarianPage/>} ></Route>
          <Route path="/confirm" element={<Confirmation/>} ></Route>
          <Route path="/select" element={<SelectPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

