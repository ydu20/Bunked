import {Routes, Route} from 'react-router-dom';
import FrontPage from './components/frontPage/FrontPage';
import Home from './components/home/Home';

function App() {
  return (
    <Routes>
      <Route index element={<FrontPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
