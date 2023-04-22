import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./page/admin";
import { Home } from "./page/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
