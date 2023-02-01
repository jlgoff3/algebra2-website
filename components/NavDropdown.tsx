import Link from 'next/link'
import { useState } from 'react'

const NavDropdown = ({ link }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleMenu = () => setExpanded(!expanded)
  const closeMenu = () => setExpanded(false)
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded={expanded}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          {link.title}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden={expanded}
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      {expanded && (
        <div
          className={
            'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          }
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {link.children.map((child, i) => {
            return (
              <div key={link.title + child.title} className="py-1" role="none">
                <Link
                  href={child.href}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id={'menu-item-' + i}
                  onClick={closeMenu}
                >
                  {child.title}
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NavDropdown
