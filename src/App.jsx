import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditBooks from "./pages/EditBooks";
import AddBook from "./pages/AddBook";
import Navbar from "./components/Navbar";
import ReturnBook from "./pages/ReturnBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  return (
    <>
      <BrowserRouter>
        {/* Toast Container is placed in center of the page */}
        <ToastContainer position="top-center" />
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home setId={setId} />} />
            <Route path="/edit-book" element={<EditBooks id={id} />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/return-book" element={<ReturnBook setId={setId} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;