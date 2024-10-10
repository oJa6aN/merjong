
export interface RunOptions {
  querySelector?: string
}

const contentLoaded = () => {
  merjong.run()
}

if (typeof document !== 'undefined') {
  // ! Wait for document loaded before starting the execution
  window.addEventListener('load', contentLoaded, false)
}


const run = async (options: RunOptions = { querySelector: '.merjong' }) => {
  console.log(this)
  await runThrowsErrors(options)
}

const runThrowsErrors = async ({ querySelector = '.mermaid' }: RunOptions) => {
  const nodesToProcess: ArrayLike<HTMLElement> = document.querySelectorAll(querySelector)

  for (const element of Array.from(nodesToProcess)) {
    console.log(element.innerHTML)
  }
}

export type Merjong = {
  run: typeof run
}

const merjong: Merjong = {
  run
}

export default merjong
