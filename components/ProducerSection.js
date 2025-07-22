import styles from '../styles/ProducerSection.module.css'

/**
 * Panel with a solid light background color
 * Props:
 *  - title: string
 *  - align: 'left' | 'right'
 *  - color: string (CSS color for background)
 */
export default function ProducerSection({ title, align, color }) {
  const classNames = `${styles.section} ${styles[align]}`
  return (
    <div className={classNames} style={{ backgroundColor: color }}>
      <div className={styles.content}>
        <h2>{title}</h2>
      </div>
    </div>
  )
}