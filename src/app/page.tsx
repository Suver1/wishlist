import Image from 'next/image'
import styles from './page.module.css'
import Script from 'next/script'
import { getData } from './wishlistData'
import Link from 'next/link'

export default async function Home() {
  const wishlist = await getData()

  return (
    <main className={styles.main}>
      <Script
        src="https://kit.fontawesome.com/6ce357bbe2.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <h1 className={`${styles.heading} ${styles.backgroundGradient}`}>
        <div className={styles.treeIconContainer}>
          <i
            className={`${styles.treeIcon} ${styles.pulse} fa-solid fa-tree`}
          ></i>
        </div>
        Ønskeliste Andreas
      </h1>
      <div className={styles.wishlist__container}>
        {Object.entries(wishlist).map(([category, items]) => (
          <div key={category} className={styles.wishlist__category}>
            <h2 className={styles.subHeading}>{category}</h2>
            {items.map((item) => (
              <div key={item.name} className={styles.wishlist__item}>
                {(item.url && (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className={styles.wishlist__link}
                  >
                    {item.name}{' '}
                    <i
                      className={`${styles.wishlist__linkIcon} fas fa-external-link-alt`}
                    ></i>
                  </Link>
                )) ||
                  item.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`${styles.logoContainer} ${styles.backgroundGradient}`}>
        <Image
          unoptimized
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
