import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/christmas-hat.png"
          alt="Christmas hat"
          width={571 / 2}
          height={445 / 2}
          priority
        />
      </div>
    </main>
  )
}
