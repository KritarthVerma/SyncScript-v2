import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
    <ToastContainer position="top-right" theme="dark" />
  </>
  );
}

export default App;
