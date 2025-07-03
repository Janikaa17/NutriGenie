import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import RecipeInputPage from './pages/RecipeInputPage';
import RecipeOutputPage from './pages/RecipeOutputPage';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/transformer" element={<RecipeInputPage />} />
        <Route path="/output" element={<RecipeOutputPage />} />
      </Routes>
    </div>
  );
}

export default App;

