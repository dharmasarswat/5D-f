import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddScript from "./AddScript";
import AllScripts from "./AllScripts";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/all-scripts" />} />
        <Route path="/add-script" element={<AddScript />} />
        <Route path="/all-scripts" element={<AllScripts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
