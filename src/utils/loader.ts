interface LoaderBase {
  isLoading: boolean
  loadCbs: Array<Function>
  doneCbs: Array<Function>
}

class Loader {
  isLoading: LoaderBase['isLoading'] = false
  loadCbs: LoaderBase['loadCbs'] = []
  doneCbs: LoaderBase['doneCbs'] = []

  constructor(options: Partial<LoaderBase> = {}) {
    this.init(options)
  }
  init(options: Partial<LoaderBase>) {
    const { isLoading, loadCbs, doneCbs } = options
    if (isLoading) {
      this.isLoading = isLoading
    }
    if (loadCbs) {
      this.loadCbs.push(...loadCbs)
    }
    if (doneCbs) {
      this.loadCbs.push(...doneCbs)
    }
  }
  load = () => {
    this.isLoading = true
    this.doLoad()
  }
  done = () => {
    this.isLoading = false
    this.doDone()
  }
  onLoad = (cb: Function) => {
    this.loadCbs.push(cb)
  }
  onDone = (cb: Function) => {
    this.doneCbs.push(cb)
  }
  doLoad = () => {
    this.loadCbs.forEach(cb => {
      cb()
    })
  }
  doDone = () => {
    this.doneCbs.forEach(cb => {
      cb()
    })
  }
}

export default Loader
