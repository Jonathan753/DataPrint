import { useMyContext } from "../layout/Sidebar";
import { Link } from "react-router-dom";
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  to: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon, text, active, alert, to, onClick }: SidebarItemProps) => {

  const { expanded } = useMyContext();

  return (
    <li  onClick={onClick}>
      <Link to={to}
        className={`
              relative flex items-center py-2 px-3 my-1
              font-medium rounded-md cursor-pointer
              transition-colors group
              ${active
            ? "bg-zinc-500 text-white"
            : "hover:bg-zinc-600 text-white"
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
          bg-zinc-900 text-white text-sm
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

export {SidebarItem}