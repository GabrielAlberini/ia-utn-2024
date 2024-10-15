import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-products" element={<AdminProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
