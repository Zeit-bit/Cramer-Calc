import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import App from "./App.jsx"
import Quickguide from "./Quickguide.jsx"
const Home = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quickquide" element={<Quickguide />} />
      </Routes>
    </Router>
  )
}

export default Home
