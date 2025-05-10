import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Success from './pages/Success'; // Optional

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        {/* Add more routes like /about if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
