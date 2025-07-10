// components/Nav.js
import { useState, useRef } from 'react'
import Link from 'next/link'

/* ─── helper to render each two-column menu ─── */
function MenuColumns({ heading, mains, subs }) {
  return (
    <>
      <li className="dropdown-col">
        <span className="dropdown-heading">{heading}</span>
        {mains.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="dropdown-link main"
          >
            {label}
          </Link>
        ))}
      </li>
      <li className="dropdown-col">
        <span className="dropdown-heading">moreLinks</span>
        {subs.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="dropdown-link sub"
          >
            {label}
          </Link>
        ))}
      </li>
    </>
  )
}


export default function Nav() {
  // what content to show
  const [activeMenu, setActiveMenu]   = useState(null)
  // whether the panel is visually open or closed
  const [isExpanded, setIsExpanded] = useState(false)

  const hideTimeout = useRef(null)

  const showMenu = (key) => {
    clearTimeout(hideTimeout.current)    // cancel any pending unmount
    setActiveMenu(key)                   // pick which column to render
    setIsExpanded(true)                  // slide the panel open
  }
  const hideMenu = () => {
    setIsExpanded(false)                 // begin CSS collapse right away
    // only _after_ 400ms (your CSS’s collapse duration) do we unmount
    hideTimeout.current = setTimeout(() => {
      setActiveMenu(null)
    }, 400)
  }
  // exactly the same as your old `expanded`
  const expanded = isExpanded

  return (
    <>
      <nav
        id="navbar"
        className={`navbar ${expanded ? 'expanded' : ''}`}
        onMouseLeave={hideMenu}           /* collapse when cursor leaves the nav */
      >
        <div className="navbar-top">
          <Link href="/" className="logo">
            <img src="/img/logo.png" alt="Logo" />
          </Link>

          <ul className="nav-links">
            <li
              id="dropdown-trigger"
              className="dropdown"
              onMouseEnter={() => showMenu('producers')}
            >
              <Link href="/producers" className="nav-item">
                Producers
              </Link>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => showMenu('genres')}
            >
              <Link href="/genres">Genres</Link>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => showMenu('genre2')}
            >
              <Link href="/genre2">Genre 2</Link>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => showMenu('genre3')}
            >
              <Link href="/genre3">Genre 3</Link>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => showMenu('genre4')}
            >
              <Link href="/genre4">Genre 4</Link>
            </li>
          </ul>

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
            >
          {activeMenu === 'producers' && (
            <MenuColumns
            heading="prods"
            mains={[
                { label: 'DanielDials', href: '/DanielDials-Prod' },
                { label: 'Elevate.',    href: '/Elevate-Prod'  },
            ]}
                subs={[
                { label: 'Filler1', href: '/filler1' },
                { label: 'Filler2', href: '/filler2' },
                { label: 'Filler3', href: '/filler3' },
                { label: 'Filler4', href: '/filler4' },
                ]}
            />
          )}

          {activeMenu === 'genres' && (
            <MenuColumns
              heading="genres"
            mains={[
                { label: 'Trap',    href: '/trap'    },
                { label: 'Hip-Hop', href: '/hip-hop' },
                { label: 'RnB',     href: '/rnb'     },
            ]}
            subs={[
                { label: 'FillerA', href: '/fillera' },
                { label: 'FillerB', href: '/fillerb' },
                { label: 'FillerC', href: '/fillerc' },
                { label: 'FillerD', href: '/fillerd' },
            ]}
            />
          )}

          {activeMenu === 'genre2' && (
            <MenuColumns
              heading="genre2"
            mains={[
                { label: 'Trap',    href: '/trap'    },
                { label: 'Hip-Hop', href: '/hip-hop' },
                { label: 'RnB',     href: '/rnb'     },
            ]}
            subs={[
                { label: 'FillerA', href: '/fillera' },
                { label: 'FillerB', href: '/fillerb' },
                { label: 'FillerC', href: '/fillerc' },
                { label: 'FillerD', href: '/fillerd' },
            ]}
            />
          )}

          {activeMenu === 'genre3' && (
            <MenuColumns
              heading="genre3"
            mains={[
                { label: 'Trap',    href: '/trap'    },
                { label: 'Hip-Hop', href: '/hip-hop' },
                { label: 'RnB',     href: '/rnb'     },
            ]}
            subs={[
                { label: 'FillerA', href: '/fillera' },
                { label: 'FillerB', href: '/fillerb' },
                { label: 'FillerC', href: '/fillerc' },
                { label: 'FillerD', href: '/fillerd' },
            ]}
            />
          )}

          {activeMenu === 'genre4' && (
            <MenuColumns
              heading="genre4"
            mains={[
                { label: 'Trap',    href: '/trap'    },
                { label: 'Hip-Hop', href: '/hip-hop' },
                { label: 'RnB',     href: '/rnb'     },
            ]}
            subs={[
                { label: 'FillerA', href: '/fillera' },
                { label: 'FillerB', href: '/fillerb' },
                { label: 'FillerC', href: '/fillerc' },
                { label: 'FillerD', href: '/fillerd' },
            ]}
            />
          )}
        </ul>
      </nav>

      <div
        id="page-blur"
        className={`page-blur ${expanded ? 'active' : ''}`}
      />
    </>
  )
}