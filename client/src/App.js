import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./pages/Create";
import Pantries from "./pages/Pantries"; // Ensure case matches file name
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/app">
        <Routes>
          <Route path="/" element={<Pantries />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
