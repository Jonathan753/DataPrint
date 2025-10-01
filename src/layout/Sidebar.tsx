// src/components/Sidebar.tsx

import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useState } from "react";
import logo from "../assets/logo_newDataPrint.svg";

// Criando um contexto para compartilhar o estado da sidebar
const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });
interface SidebarProps {
   children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
   const [expanded, setExpanded] = useState(true);

   return (
      <aside className="h-auto">
         <nav className="h-full flex flex-col bg-zinc-900 shadow-sm"> 
            <div className="p-4 pb-2 flex justify-between items-center">
               <img
                  src={logo}
                  className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                     }`}
                  alt="Logo"
               />
               <button
                  onClick={() => setExpanded((curr) => !curr)}
                  className="p-1.5 rounded-lg bg-slate-600 hover:bg-slate-300 text-white"
               >
                  {expanded ? <ChevronFirst /> : <ChevronLast />}
               </button>
            </div>

            {/* Passando o estado 'expanded' para os filhos via Contexto */}

            <SidebarContext.Provider value={{ expanded }}>
               <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>
            {/* Seção do Usuário no rodapé */}
         </nav>
      </aside>
   );
}
export default Sidebar;

export function useMyContext() {
   const context = useContext(SidebarContext);
   if (!context) {
      throw new Error("useMyContext deve ser usado dentro de um <MyProvider>");
   }
   return context;
}
