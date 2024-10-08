import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar, Home, About, Characters } from "./components";
import { importantText } from "./constants";

function App() {
  console.log(importantText);

  return (
    <div className="relative z-0">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </div>
  );
}

export default App;
