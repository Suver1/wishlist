import { parseString } from '@fast-csv/parse'

type WishlistRow = {
  category: string
  name: string
  url: string
  imageUrl: string
}

type WishlistGroupedByCategory = {
  [category: string]: WishlistRow[]
}

async function downloadWishlist() {
  if (!process.env.GOOGLE_SHEETS_URL) {
    throw new Error("Missing env variable 'GOOGLE_SHEETS_URL'")
  }

  const response = await fetch(process.env.GOOGLE_SHEETS_URL, {
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    },
    next: {
      revalidate: 60 * 10,
    },
  })
  return await response.text()
}

async function parseWishlistCsv(csv: string): Promise<WishlistRow[]> {
  return new Promise((resolve, reject) => {
    const rows: WishlistRow[] = []
    parseString<WishlistRow, any>(csv, { headers: true })
      .on('error', (error) => {
        reject(error)
      })
      .on('data', (row: WishlistRow) => {
        rows.push(row)
      })
      .on('end', (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`)
        resolve(rows)
      })
  })
}

async function getWishlist() {
  const csv = await downloadWishlist()
  return await parseWishlistCsv(csv)
}

export async function getData() {
  const wishlist = await getWishlist()
  let wishListByCategory: WishlistGroupedByCategory = {}
  wishlist.forEach((item) => {
    if (!wishListByCategory[item.category]) {
      wishListByCategory[item.category] = []
    }
    wishListByCategory[item.category].push(item)
  })

  return wishListByCategory
}
