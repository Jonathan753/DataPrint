import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser';
import AddService from './pages/AddService';
import Sidebar from './layout/Sidebar';
import { SidebarItem } from './components/SidebarItem';
import { UsersRound, UserRoundPlus, PackagePlus, PackageSearch, File, Info, } from "lucide-react"
import NoteFast from './pages/NoteFast';
import ClientList from './pages/ClientList';
import ServiceList from './pages/ServiceList';
import MyInfo from './pages/MyInfo';
import TemplateNota from './service/TemplateNota';
import Modelo from './service/Modelo';
import { useState } from 'react';

type Page = "add-user" | "add-service" | "client-list" | "service-list" | "nota-fast" | "my-info";

function App() {
  const [activePage, setActivePage] = useState<Page>("add-user")

  return (
    <>
      <BrowserRouter>
        <main className="flex">
          <Sidebar>
            <SidebarItem onClick={() => setActivePage("add-user")} active={activePage === "add-user"} to="add-user" icon={<UserRoundPlus size={20} />} text="Adicionar Cliente" />
            <SidebarItem onClick={() => setActivePage("add-service")} active={activePage === "add-service"} to="add-service" icon={<PackagePlus size={20} />} text="Adicionar Serviço/Produto" />
            <SidebarItem onClick={() => setActivePage("client-list")} active={activePage === "client-list"} to="client-list" icon={<UsersRound size={20} />} text="Lista de Clientes" />
            <SidebarItem onClick={() => setActivePage("service-list")} active={activePage === "service-list"} to="service-list" icon={<PackageSearch size={20} />} text="Lista de Serviço/Produto" />
            <SidebarItem onClick={() => setActivePage("nota-fast")} active={activePage === "nota-fast"} to="nota-fast" icon={<File size={20} />} text="Nota Rápida" />
            <hr className="my-3" />
            <SidebarItem to="my-info" onClick={() => setActivePage("my-info")} active={activePage === "my-info"} icon={<Info size={20} />} text="Meus Dados" />
            <SidebarItem to="nota" icon={<Info size={20} />} text="Teste" />
          </Sidebar>
          <div className='flex-1 h-screen overflow-y-auto m-5'>
            <div className='max-w-4xl mx-auto'>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Routes>
                  <Route path='/' element={<AddUser />} />
                  <Route path='/add-user' element={<AddUser />} />
                  <Route path='/client-list' element={<ClientList />} />
                  <Route path='/add-service' element={<AddService />} />
                  <Route path='/nota-fast' element={<NoteFast />} />
                  <Route path='/service-list' element={<ServiceList />} />
                  <Route path='/my-info' element={<MyInfo />} />
                  <Route path='/nota' element={<TemplateNota />} />
                  <Route path='/modelo/:id' element={<Modelo />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
