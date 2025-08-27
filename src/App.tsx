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
            <SidebarItem to="/add-user" icon={<LayoutDashboard size={20} />} text="Adicionar Cliente" />
            <SidebarItem to="/" icon={<BarChart3 size={20} />} active text="Listar Clientes" />
            <SidebarItem to="add-user" icon={<BarChart3 size={20} />} alert text="Adicionar Serviço/Produto" />
            <SidebarItem to="add-user" icon={<BarChart3 size={20} />} alert text="Listar Serviço/Produto" />
            <SidebarItem to="add-service" icon={<UserCircle size={20} />} text="Nota Rápida" />
            <hr className="my-3" />
            <SidebarItem to="teste" icon={<Settings size={20} />} text="Meus Dados" />
          </Sidebar>
          {/* conteudo da pagina */}
          <div className='flex-1 h-screen overflow-y-auto p-8'>
            <div className='max-w-4xl mx-auto'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/add-user' element={<AddUser />} />
                  <Route path='/add-service' element={<AddService />} />
                </Routes>
              {/* fim do conteudo da pagina */}
            </div>
          </div>
        </main>

      </BrowserRouter>
    </>
  )
}

export default App
