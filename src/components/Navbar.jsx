/* eslint-disable no-unused-vars */
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { MdLeaderboard } from "react-icons/md"
import { HiUserGroup } from "react-icons/hi"
import { FiHome, FiUser, FiAward, FiSettings, FiMenu, FiX, FiUsers } from "react-icons/fi"

const navLinks = [
  { label: 'Home', icon: FiHome, path: '/feed' },
  { label: 'Community', icon: HiUserGroup, path: '/community' },
  { label: 'Profile', icon: FiUser, path: '/profile' },
  { label: 'Leaderboard', icon: MdLeaderboard, path: '/leaderboard' },
  { label: 'Achievements', icon: FiAward, path: '/achievements' },
  { label: 'Settings', icon: FiSettings, path: '/settings' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 bg-dark text-white px-4 py-8 z-50"
      >
        <h1 className="text-2xl font-extrabold mb-10 px-2">
          Scholar<span className="text-accent">Hub</span>
        </h1>
        <nav className="flex flex-col gap-1">
          {navLinks.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>
      </motion.div>

      <div className="md:hidden fixed top-0 left-0 right-0 bg-dark text-white px-5 py-4 flex items-center justify-between z-50">
        <h1 className="text-xl font-extrabold">
          Scholar<span className="text-accent">Hub</span>
        </h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-14 left-0 right-0 bg-dark text-white px-5 py-4 z-40 flex flex-col gap-1"
          >
            {navLinks.map(({ label, icon: Icon, path }) => (
              <Link
                key={label}
                to={path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar