import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './pages/Client/AddUser';
import AddService from './pages/Service/AddService';
import Sidebar from './layout/Sidebar';
import { SidebarItem } from './components/SidebarItem';
import { UsersRound, UserRoundPlus, PackagePlus, PackageSearch, File, Info, HomeIcon, Receipt, } from "lucide-react"
import NoteFast from './pages/NoteFast';
import ClientList from './pages/Client/ClientList';
import ServiceList from './pages/Service/ServiceList';
import MyInfo from './pages/MyInfo';
// import TemplateNota from './service/TemplateNota';
import Modelo from './service/Modelo';
import { useState } from 'react';
import TitleBar from './layout/Titlebar';
import EditUser from './pages/Client/EditUser';
import Receipts from './pages/Receipt/Receipts';
import EditService from './pages/Service/EditService';
import Home from './pages/Home';
import ViewUser from './pages/Client/ViewUser';
import TemplateFast from './service/TemplateFast';
import ViewReceipt from './pages/Receipt/ViewReceipt';

type Page = "add-user" | "add-service" | "client-list" | "service-list" | "nota-fast" | "my-info" | "/" | "receipts";

function App() {
  const [activePage, setActivePage] = useState<Page>("add-user")

  return (
    <>
      <div className="flex flex-col h-dvh">
        <TitleBar />
        <BrowserRouter>
          <main className="flex flex-1 overflow-hidden bg-background-main">
            <Sidebar>
              <SidebarItem onClick={() => setActivePage("/")} active={activePage === "/"} to="/" icon={<HomeIcon size={20} />} text="Home" />
              <SidebarItem onClick={() => setActivePage("add-user")} active={activePage === "add-user"} to="add-user" icon={<UserRoundPlus size={20} />} text="Adicionar Cliente" />
              <SidebarItem onClick={() => setActivePage("add-service")} active={activePage === "add-service"} to="add-service" icon={<PackagePlus size={20} />} text="Adicionar Serviço/Produto" />
              <SidebarItem onClick={() => setActivePage("client-list")} active={activePage === "client-list"} to="client-list" icon={<UsersRound size={20} />} text="Lista de Clientes" />
              <SidebarItem onClick={() => setActivePage("service-list")} active={activePage === "service-list"} to="service-list" icon={<PackageSearch size={20} />} text="Lista de Serviço/Produto" />
              <SidebarItem onClick={() => setActivePage("nota-fast")} active={activePage === "nota-fast"} to="nota-fast" icon={<File size={20} />} text="Nota Rápida" />
              <SidebarItem onClick={() => setActivePage("receipts")} active={activePage === "receipts"} to="receipts" icon={<Receipt size={20} />} text="Notas" />
              <hr className="my-3" />
              <SidebarItem to="my-info" onClick={() => setActivePage("my-info")} active={activePage === "my-info"} icon={<Info size={20} />} text="Meus Dados" />
              {/* <SidebarItem to="nota" icon={<Info size={20} />} text="Teste" /> */}
            </Sidebar>
            <div className='flex-1 overflow-y-auto p-10 border border-zinc-700'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add-user' element={<AddUser />} />
                <Route path='/client-list' element={<ClientList />} />
                <Route path='/add-service' element={<AddService />} />
                <Route path='/nota-fast' element={<NoteFast />} />
                <Route path='/service-list' element={<ServiceList />} />
                <Route path='/my-info' element={<MyInfo />} />
                <Route path='/receipts' element={<Receipts />} />
                <Route path='/nota-fast/template' element={<TemplateFast />} />
                <Route path='/modelo/:id' element={<Modelo />} />
                <Route path='/client/edit/:id' element={<EditUser />} />
                <Route path='/service/edit/:id' element={<EditService />} />
                <Route path='/client/view/:id' element={<ViewUser />} />
                <Route path='/receipts/view/:id' element={<ViewReceipt />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App


