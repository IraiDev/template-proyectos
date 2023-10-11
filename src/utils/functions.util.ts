export function showErrorInLogs(error: unknown, where: string) {
  console.log(`ERROR AL ${where.toLocaleUpperCase()} (CATCH): `, { error })
}

export function sleep(seconds: number | undefined = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export function createGoogleMapUrl(latitude: string, longitude: string) {
  return `https://www.google.com/maps?q=${latitude},${longitude}`
}
