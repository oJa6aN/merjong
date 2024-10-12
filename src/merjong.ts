import themes from './themes/index.js'

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

const runThrowsErrors = async ({ querySelector = '.mermaid' }: RunOptions) => {
  const nodesToProcess: ArrayLike<HTMLElement> = document.querySelectorAll(querySelector)
  for (const element of Array.from(nodesToProcess)) {
    const mpsz = element.innerHTML.trim()
    const svg = await render(mpsz)
    element.innerHTML = svg
  }
}

const run = async (options: RunOptions = { querySelector: '.merjong' }) => {
  await runThrowsErrors(options)
}

const arrangeMPSZ = (mpsz: string) => {
  mpsz = mpsz.replaceAll("?", "Q")

  const result: string[] = []
  const mpszRegex = /[0-9XQ][0-9XQ'"]*[mspzxq]|-|['"]?[xq]/g

  const suitGroups = mpsz.match(mpszRegex) || []
  suitGroups.forEach(sameSuitGroup => {
    switch (sameSuitGroup) {
      case 'x': case 'q': case '-':
        result.push(sameSuitGroup)
        break
      default:
        const numbers = sameSuitGroup.slice(0, -1)
        const suit = sameSuitGroup.slice(-1)

        for (let i = 0;i < numbers.length;i++) {
          const char = numbers[i]
          if (char === "'" || char === '"') { continue }
          const nextChar = numbers[i + 1] || false
          result.push(`${char}${(nextChar === "'" || nextChar === '"') ? nextChar : ''}${suit}`)
        }
        break
    }
  })
  return result
}

const render = (mpsz: string) => {
  const theme = themes.default.getThemeVariables()
  const tileDesigns = theme.tileDesigns
  const tileWidth = 36
  const tileHeight = 48

  let svgContent = ''
  const arrMPSZ = arrangeMPSZ(mpsz)

  arrMPSZ.forEach((tile, index) => {
    const xPosition = index * (tileWidth + 1) + 1
    svgContent += `<image href="${tileDesigns['base']}" x="${xPosition}" y="1" width="${tileWidth}" height="${tileHeight}" /><image href="${tileDesigns[tile]}" x="${xPosition}" y="1" width="${tileWidth}" height="${tileHeight}" />`
  })

  return `<svg  style="background-color: #008800" width="${(tileWidth + 1) * arrMPSZ.length + 1}" height="${tileHeight + 2}">${svgContent}</svg>`
}

export type Merjong = {
  run: typeof run
}

const merjong: Merjong = {
  run
}

export default merjong
