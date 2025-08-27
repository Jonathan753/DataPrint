import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddService from './pages/AddService';
import Sidebar, { SidebarItem } from './layout/Sidebar'



import {
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react"

function App() {

  return (
    <>
      <BrowserRouter>
        <main className="flex">
          <Sidebar>
            <SidebarItem to="/" icon={<LayoutDashboard size={20} />} text="Adicionar Cliente" />
            <SidebarItem to="add-user" icon={<BarChart3 size={20} />} active text="Adicionar Serviço/Produto" />
            <SidebarItem to="add-service" icon={<UserCircle size={20} />} text="Nota Rápida" />
            <hr className="my-3" />
            <SidebarItem to="teste" icon={<Settings size={20} />} text="Meus Dados" />
          </Sidebar>
          {/* conteudo da pagina */}
          <div className='p-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/add-user' element={<AddUser />} />
              <Route path='/add-service' element={<AddService />} />
            </Routes>
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Conteúdo Principal</h1>
          </div>
          {/* fim do conteudo da pagina */}
        </main>

      </BrowserRouter>
    </>
  )
}

export default App
