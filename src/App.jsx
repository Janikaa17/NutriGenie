import { Routes, Route } from 'react-router-dom';
import CacheManager from './components/CacheManager';

import Home from './pages/Home';
import RecipeInputPage from './pages/RecipeInputPage';
import RecipeOutputPage from './pages/RecipeOutputPage';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transformer" element={<RecipeInputPage />} />
        <Route path="/output" element={<RecipeOutputPage />} />
      </Routes>
      <CacheManager />
    </div>
  );
}

export default App;

