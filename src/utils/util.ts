export function debound(fn: Function, t: number) {
  let timer: NodeJS.Timeout | null = null
  return (...args: unknown[]) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, t)
  }
}

export function sleep(t: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}
