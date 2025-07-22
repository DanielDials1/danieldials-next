import Head from 'next/head'
import ProducerSection from '../components/ProducerSection'

// Define light background colors for each panel
const sections = [
  { title: 'Daniel Dials', color: '#f5f5dc', align: 'left' },   // beige
  { title: 'Elevate', color: '#e0ffff', align: 'right' },         // light cyan
  // add more panels with different light colors
]

export default function Producers() {
  return (
    <>
      <Head>
        <title>Producers | Home</title>
      </Head>

      {/* Hero header, 25vh tall */}
      <section className="hero" style={{ height: '25vh' }}>
        <img
          className="hero-bg"
          src="/img/ProdBck1.png"
          alt="Blurred background"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div
          className="hero-content"
          style={{ left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}
        >
          <h1>Meet Our Producers.</h1>
        </div>
      </section>

      <main style={{ padding: 0 }}>
        {sections.map((sec, idx) => (
          <ProducerSection
            key={idx}
            title={sec.title}
            align={sec.align}
            color={sec.color}
          />
        ))}
      </main>
    </>
  )
}