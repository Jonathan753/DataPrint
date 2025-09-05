import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import NoteFast from './pages/NoteFast';
import ClientList from './pages/ClientList';
import ServiceList from './pages/ServiceList';
import MyInfo from './pages/MyInfo';

function App() {

  return (
    <>

      <BrowserRouter>
        <main className="flex">
          <Sidebar>
            <SidebarItem to="add-user" icon={<UserRoundPlus size={20} />} text="Adicionar Cliente" />
            <SidebarItem to="add-service" icon={<PackagePlus size={20} />} alert text="Adicionar Serviço/Produto" />
            <SidebarItem to="client-list" icon={<UsersRound size={20} />} active text="Lista de Clientes" />
            <SidebarItem to="service-list" icon={<PackageSearch size={20} />} alert text="Lista de Serviço/Produto" />
            <SidebarItem to="nota" icon={<File size={20} />} text="Nota Rápida" />
            <hr className="my-3" />
            <SidebarItem to="my-info" icon={<Info size={20} />} text="Meus Dados" />
          </Sidebar>
          {/* conteudo da pagina */}
          {/* <div className='title-bar'>
            <div className='title'>Seu Aplicativo Maneiro</div>
            <div className='window-controls'>
              <button id="minimize-btn">_</button>
              <button id="max-unmax-btn">[]</button>
              <button id="close-btn">X</button>
            </div>
          </div> */}
          <div className='flex-1 h-screen overflow-y-auto m-5'>
            <div className='max-w-4xl mx-auto'>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Routes>
                  {/* <Route path='/' element={<Home />} /> */}
                  <Route path='/' element={<AddUser />} />
                  <Route path='/add-user' element={<AddUser />} />
                  <Route path='/client-list' element={<ClientList />} />
                  <Route path='/add-service' element={<AddService />} />
                  <Route path='/nota' element={<NoteFast />} />
                  <Route path='/service-list' element={<ServiceList />} />
                  <Route path='/my-info' element={<MyInfo />} />
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
