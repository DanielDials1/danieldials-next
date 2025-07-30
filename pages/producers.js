import Head from 'next/head'
import ProducerSection from '../components/ProducerSection'
import NewsCarouselSlider from '../components/NewsCarouselSlider'
import { useEffect, useState } from 'react'

const sections = [
  {
    title: 'Daniel Dials',
    color: '#f5f5dc',
    align: 'left',
    link: '/DanielDials-Prod',
  },
  {
    title: 'Elevate',
    color: '#e0ffff',
    align: 'right',
    link: '/Elevate-Prod',
  },
]

export default function Producers() {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setFade(true)
    const timeout = setTimeout(() => setFade(false), 600)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Head>
        <title>Producers | Home</title>
      </Head>

      <main className="comic-dots" style={{ backgroundColor: '#f7f7f7', padding: 0 }}>
        <div className={fade ? 'fade-slide' : ''}>
          <NewsCarouselSlider />
        <div style={{ height: '8rem' }} />
        </div>

        <div style={{ backgroundColor: '#2c2c2c', padding: '4rem 0' }}>
          <div style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
            <h2 style={{ fontSize: '4.5rem', margin: 0, textDecoration: 'underline', color: '#fff', letterSpacing: '0.25em' }}>Producers</h2>
          </div>

          {sections.map((sec, idx) => (
            <ProducerSection
              key={idx}
              title={sec.title}
              align={sec.align}
              color={sec.color}
              link={sec.link}
            />
          ))}
        </div>

        <div style={{ textAlign: 'left', padding: '4rem 0 2rem 25rem' }}>
          <h2 style={{ fontSize: '3.5rem', margin: 0, textDecoration: 'underline' }}>
            <span className="record-dot" />
            Input
          </h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <div style={{ width: '200px', height: '200px', backgroundColor: '#555', borderRadius: '16px' }} />
        </div>
      </main>

      <style jsx>{`
        .record-dot {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-color: red;
          border-radius: 50%;
          margin-right: 0.5rem;
          vertical-align: middle;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .fade-slide {
          animation: fadeInSlide 0.6s ease-in-out;
        }
        @keyframes fadeInSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .comic-dots {
          position: relative;
          z-index: 1;
          isolation: isolate;
        }
        .comic-dots::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          background-image: radial-gradient(circle at top left, rgba(129, 4, 4, 0.3) 1px, transparent 1px);
          background-size: 12px 12px;
          mask-image: linear-gradient(to bottom right, rgba(0,0,0,1), rgba(0,0,0,0));
          -webkit-mask-image: linear-gradient(to bottom right, rgba(0,0,0,1), rgba(0,0,0,0));
        }
      `}</style>
    </>
  )
}