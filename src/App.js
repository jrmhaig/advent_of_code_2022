import { Routes, Route } from "react-router-dom";
import 'bulma/css/bulma.min.css';

import Layout from './components/Layout';
import Home from './components/Home';
import DayOne from './components/DayOne';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="day_01" element={<DayOne />} />
      </Route>
    </Routes>
  );
}

export default App;
