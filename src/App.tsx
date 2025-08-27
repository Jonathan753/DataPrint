import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import AddService from './pages/AddService';
import Sidebar from './layout/Sidebar';
import { SidebarItem } from './components/SidebarItem';
import {
  UsersRound,
  UserRoundPlus,
  PackagePlus,
  PackageSearch,
  File,
  Info,
} from "lucide-react"

function App() {

  return (
    <>
    
      <BrowserRouter>
        <main className="flex">
          <Sidebar>
            <SidebarItem to="/add-user" icon={<UserRoundPlus size={20} />} text="Adicionar Cliente" />
            <SidebarItem to="add-service" icon={<PackagePlus size={20} />} alert text="Adicionar Serviço/Produto" />
            <SidebarItem to="/" icon={<UsersRound size={20} />} active text="Lista de Clientes" />
            <SidebarItem to="add-user" icon={<PackageSearch size={20} />} alert text="Lista de Serviço/Produto" />
            <SidebarItem to="add-service" icon={<File size={20} />} text="Nota Rápida" />
            <hr className="my-3" />
            <SidebarItem to="teste" icon={<Info size={20} />} text="Meus Dados" />
          </Sidebar>
          {/* conteudo da pagina */}
          <div className='flex-1 h-screen overflow-y-auto p-8'>
            <div className='max-w-4xl mx-auto'>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/add-user' element={<AddUser />} />
                  <Route path='/add-service' element={<AddService />} />
                </Routes>
              </div>
              {/* fim do conteudo da pagina */}
            </div>
          </div>
        </main>

      </BrowserRouter>
    </>
  )
}

export default App
