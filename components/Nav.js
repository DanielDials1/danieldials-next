// components/Nav.js
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  // what content to show
  const [activeMenu, setActiveMenu]   = useState(null)
  // whether the panel is visually open or closed
  const [isExpanded, setIsExpanded] = useState(false)

  const hideTimeout = useRef(null)
  const showTimeout  = useRef(null)
  const showDelay = 200            // wait 200 ms before switching/opening

      // snap-close (no animation) on page nav, then restore transitions
      useEffect(() => {
        const handleRouteChangeStart = () => {
          clearTimeout(showTimeout.current)
          clearTimeout(hideTimeout.current)
    
          // disable transitions inline
          const navEl = document.getElementById('navbar')
          const ddEl  = document.getElementById('dropdown-menu')
          if (navEl) navEl.style.setProperty('transition', 'none', 'important')
          if (ddEl)  ddEl.style.setProperty('transition', 'none', 'important')
    
          setIsExpanded(false)
          setActiveMenu(null)
        }
        const handleRouteChangeComplete = () => {
            // restore transitions by removing our inline override
          const navEl = document.getElementById('navbar')
          const ddEl  = document.getElementById('dropdown-menu')
          if (navEl) navEl.style.removeProperty('transition')
          if (ddEl)  ddEl.style.removeProperty('transition')
        }
    
        router.events.on('routeChangeStart',    handleRouteChangeStart)
        router.events.on('routeChangeComplete', handleRouteChangeComplete)
        return () => {
          router.events.off('routeChangeStart',    handleRouteChangeStart)
          router.events.off('routeChangeComplete', handleRouteChangeComplete)
        }
      }, [router.events])

     const showMenu = (key) => {
       // cancel any pending show or hide
       clearTimeout(showTimeout.current)
       clearTimeout(hideTimeout.current)
    
       // wait .2s before actually opening/swapping
       showTimeout.current = setTimeout(() => {
         setActiveMenu(key)
         setIsExpanded(true)
       }, showDelay)
     }
     const hideMenu = () => {
       // cancel any pending opening
       clearTimeout(showTimeout.current)
    
      // collapse immediately
       setIsExpanded(false)

       // after your 0.4s CSS collapse finishes, unmount
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
            <li className="dropdown" onMouseEnter={() => showMenu('producers')} onMouseLeave={() => clearTimeout(showTimeout.current)}>
              <Link href="/producers" className="nav-item">Producers</Link>
            </li>
            <li className="dropdown" onMouseEnter={() => showMenu('artists')} onMouseLeave={() => clearTimeout(showTimeout.current)}>
              <Link href="/artists" className="nav-item">Artists</Link>
            </li>
            <li className="dropdown" onMouseEnter={() => showMenu('genres')} onMouseLeave={() => clearTimeout(showTimeout.current)}>
              <Link href="/genres" className="nav-item">Genres</Link>
            </li>
            <li className="dropdown" onMouseEnter={() => showMenu('support')} onMouseLeave={() => clearTimeout(showTimeout.current)}>
              <Link href="/support" className="nav-item">Support</Link>
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
                { label: 'Sample Submissions', href: '/sample-submissions' },
                { label: 'Apply',              href: '/apply'              },
              ]}
            />
            )}
            {activeMenu === 'artists' && (
              <MenuColumns
                heading="artists"
                mains={[
                  { label: 'Artist A', href: '/artist-a' },
                  { label: 'Artist B', href: '/artist-b' },
                ]}
                subs={[
                  { label: 'Band X', href: '/band-x' },
                  { label: 'Band Y', href: '/band-y' },
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
                  { label: 'SubA', href: '/suba' },
                  { label: 'SubB', href: '/subb' },
                ]}
              />
            )}
            {activeMenu === 'support' && (
              <MenuColumns
                heading="support"
                mains={[
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ',     href: '/faq'     },
                ]}
                subs={[
                  { label: 'Help',     href: '/help'     },
                  { label: 'Feedback', href: '/feedback' },
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