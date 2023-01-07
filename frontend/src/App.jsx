import {Routes, Route} from 'react-router-dom';
import FrontPage from './components/frontPage/FrontPage';

function App() {
  return (
    <Routes>
      <Route index element={<FrontPage />} />
    </Routes>
  );
}

export default App;
