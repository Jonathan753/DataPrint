// src/components/Sidebar.tsx

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

// Criando um contexto para compartilhar o estado da sidebar
const SidebarContext = createContext<{ expanded: boolean }>({ expanded: true });

interface SidebarProps {
   children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
   const [expanded, setExpanded] = useState(true);

   return (
      <aside className="h-screen">
         <nav className="h-full flex flex-col bg-white border-r shadow-sm">
            <div className="p-4 pb-2 flex justify-between items-center">
               {/* Logo que encolhe e expande */}
               <img
                  src="https://img.logoipsum.com/243.svg"
                  className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                     }`}
                  alt="Logo"
               />
               {/* Botão para controlar o estado */}
               <button
                  onClick={() => setExpanded((curr) => !curr)}
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
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

// Componente para os itens da Sidebar
interface SidebarItemProps {
   icon: React.ReactNode;
   text: string;
   active?: boolean;
   alert?: boolean;
   to: string
}

export function SidebarItem({ icon, text, active, alert, to }: SidebarItemProps) {
   const { expanded } = useContext(SidebarContext);

   return (

      <li>
         <Link to={to}
            className={`
               relative flex items-center py-2 px-3 my-1
               font-medium rounded-md cursor-pointer
               transition-colors group
               ${active
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
               }
               `}
         >


            {icon}
            <span
               className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                  }`}
            >
               {text}
            </span>
            {alert && (
               <div
                  className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                     }`}
               />
            )}

            {/* Tooltip que aparece quando a sidebar está recolhida */}
            {!expanded && (
               <div
                  className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
               >
                  {text}
               </div>
            )}
         </Link>
      </li>
   );
}