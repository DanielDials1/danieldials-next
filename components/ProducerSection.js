import Link from 'next/link'
import styles from '../styles/ProducerSection.module.css'

/**
 * Panel with a solid light background color and hover-expand effect
 * Props:
 *  - title: string
 *  - align: 'left' | 'right'
 *  - color: string (CSS color for background)
 *  - link: string (href to navigate on click)
 */
export default function ProducerSection({ title, align, color, link }) {
  const classNames = `${styles.section} ${styles[align]}`
  return (
    <Link href={link} className={classNames} style={{ backgroundColor: color }}>
      <div className={styles.content}>
        <h2>{title}</h2>
      </div>
    </Link>
  )
}