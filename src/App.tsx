import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Outlet from "./pages/Outlet";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/outlet" element={<Outlet />} />
      </Routes>
    </Router>
  );
}

export default App;
