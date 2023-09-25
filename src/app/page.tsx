import Image from 'next/image'
import styles from './page.module.css'
import Script from 'next/script'

export default function Home() {
  return (
    <main className={styles.main}>
      <Script
        src="https://kit.fontawesome.com/6ce357bbe2.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <h1 className={styles.heading}>
        <div className={styles.treeIconContainer}>
          <i
            className={`${styles.treeIcon} ${styles.pulse} fa-solid fa-tree`}
          ></i>
        </div>
        Ønskeliste Andreas
      </h1>
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
