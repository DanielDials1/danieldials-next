// components/Nav.js
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [expanded, setExpanded] = useState(false)
  const hideTimeout = useRef(null)

  const showDropdown = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current)
      hideTimeout.current = null
    }
    setExpanded(true)
  }

  const hideDropdown = () => {
    hideTimeout.current = setTimeout(() => {
      setExpanded(false)
    }, 150)
  }

  return (
    <>
      <nav
        id="navbar"
        className={`navbar ${expanded ? 'expanded' : ''}`}
      >
        <div className="navbar-top">
          <Link href="/" className="logo">
            <img src="/img/logo.png" alt="Logo" />
          </Link>

          <ul className="nav-links">
            <li
              id="dropdown-trigger"
              className="dropdown"
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <Link href="/producers" className="nav-item">
                Producers
              </Link>
            </li>
            <li><Link href="/genres">Genres</Link></li>
            <li><Link href="/genre2">Genre 2</Link></li>
            <li><Link href="/genre3">Genre 3</Link></li>
            <li><Link href="/genre4">Genre 4</Link></li>
          </ul>

          {/* ◀– here are your four icon buttons on the right */}
          <div className="nav-icons">
            <button type="button" className="icon-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"/>
                <line x1="16" y1="16" x2="22" y2="22"/>
              </svg>
            </button>
            <button type="button" className="icon-btn" aria-label="Profile">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <button type="button" className="icon-btn" aria-label="Favorites">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>
              </svg>
            </button>
            <button type="button" className="icon-btn" aria-label="Cart">
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2l1 4h10l1-4H6z"/>
                <path d="M6 6h12l-1.2 12.6a2 2 0 0 1-2 1.4H9.2a2 2 0 0 1-2-1.4L6 6z"/>
              </svg>
            </button>
          </div>
        </div>

        <ul
          id="dropdown-menu"
          className={`dropdown-menu ${expanded ? 'open' : ''}`}
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          <li className="dropdown-col">
            <span className="dropdown-heading">prods</span>
            <Link href="/DanielDials-Prod" className="dropdown-link main">
              DanielDials
            </Link>
            <Link href="/Elevate-Prod" className="dropdown-link main">
              Elevate.
            </Link>
          </li>
          <li className="dropdown-col">
            <span className="dropdown-heading">moreLinks</span>
            <Link href="#" className="dropdown-link sub">Filler1</Link>
            <Link href="#" className="dropdown-link sub">Filler2</Link>
            <Link href="#" className="dropdown-link sub">Filler3</Link>
            <Link href="#" className="dropdown-link sub">Filler4</Link>
          </li>
        </ul>
      </nav>

      <div
        id="page-blur"
        className={`page-blur ${expanded ? 'active' : ''}`}
      />
    </>
  )
}