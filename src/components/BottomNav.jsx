import { NavLink } from 'react-router-dom'
import { Home, CalendarDays, BookOpen, PenLine, GraduationCap } from 'lucide-react'

const navItems = [
  { path: '/home', icon: Home, label: 'Início' },
  { path: '/vestibulares', icon: CalendarDays, label: 'Editais' },
  { path: '/cronograma', icon: BookOpen, label: 'Agenda' },
  { path: '/simulados', icon: PenLine, label: 'Simulados' },
  { path: '/cursos', icon: GraduationCap, label: 'Cursos' },
]

export default function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-2 pt-2.5 text-xs transition-all duration-200 ${
              isActive
                ? 'text-green-600'
                : 'text-gray-400 hover:text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${isActive ? 'bg-green-50' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-600" />
                )}
              </div>
              <span className={`mt-0.5 text-[10px] font-medium tracking-tight ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
