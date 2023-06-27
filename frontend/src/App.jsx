import {Routes, Route, BrowserRouter} from 'react-router-dom';
import FrontPage from './components/frontPage/FrontPage';
import Home from './components/home/Home';
import CreateBio from './components/create-bio/CreateBio';

function App() {
  return (
    <Routes>
      <Route index element={<FrontPage />} />
      <Route path= "/home/*" element={<Home />} />
      <Route path = "/create-bio" element = {<CreateBio />} />
    </Routes>
  );
};

export default App;
