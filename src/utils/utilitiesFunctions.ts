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

type SplitStringByType = number | undefined

export function splitStringBy(str: string, char: string, returnPosition: SplitStringByType = 0) {
  return str.split(char)[returnPosition] ?? ""
}

export function isEmptyObject<T extends object>(object: T) {
  return Object.keys(object).length === 0
}
