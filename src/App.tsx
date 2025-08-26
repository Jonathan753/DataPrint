import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Nota from './pages/Nota';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddService from './pages/AddService';

function App() {

  return (
    <>
      <div className='p-4'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/add-service' element={<AddService />} />
            {/* <Route path='/nota' element={<Nota />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
