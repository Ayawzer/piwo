import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Piwa from './Pages/Piwa';
import Add from './Pages/Add';
import Update from './Pages/Update';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center my-2">
      <Router>
        <Routes>
          <Route path="/" element={ <Piwa/> } />
          <Route path="/add" element={ <Add/> } />
          <Route path="/update/:id" element={ <Update/> } />
          <Route path="*" element={ <h1>404</h1> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
