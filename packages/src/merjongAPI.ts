type SVGProfileState = "" | "ponchi" | "kan" | "kakan"
type SVGProfile = {
  tileKey: string
  state: SVGProfileState
}


const genTileState = (quotes: string, svgProfiles: SVGProfile[]): SVGProfileState => {
  if (quotes === '') {
    return ''
  } else if (quotes === `'`) {
    return 'ponchi'
  } else if (quotes === `''` && svgProfiles[svgProfiles.length - 1].state === "ponchi") {
    return 'kakan'
  } else if (quotes === `"`) {
    return 'kan'
  }
  throw new Error(`() Unexpected string: ${quotes}`)
}


const genSVGProfiles = (mpsz: string) => {
  const svgProgiles: SVGProfile[] = []

  let matchSuit
  let iLastMatchSuit = -1

  const reSuit = /[mpszqx-]/g

  while ((matchSuit = reSuit.exec(mpsz)) !== null) {

    const suit = matchSuit[0]
    const numsSameSuit = mpsz.slice(iLastMatchSuit + 1, matchSuit.index)

    if ((/[mps]/.test(suit) && /./.test(numsSameSuit))
      || (/z/.test(suit) && /./.test(numsSameSuit))) {
      let matchNum
      let iLastMatchNum = -1
      while ((matchNum = /[0-9QX]/.exec(numsSameSuit)) !== null) {
        const num = matchNum[0]
        const quots = numsSameSuit.slice(iLastMatchNum + 1, matchSuit.index)

        svgProgiles.push({
          tileKey: `${num}${suit}`,
          state: genTileState(quots, svgProgiles)
        })

        iLastMatchNum = matchSuit.index
      }
    }
    iLastMatchSuit = matchSuit.index
  }

  return svgProgiles
}



const render = (mpsz: string) => {

  // const theme = themes.default.getThemeVariables()
  // const tileDesigns = theme.tileDesigns
  // const tileWidth = 36
  // const tileHeight = 48

  // const svgHeight = Math.max(tileHeight, tileWidth * 2 + 1)

  const arrMPSZ = genSVGProfiles(mpsz)
  // return ``
  // let xPosition = 0
  // let svgInner = ''

  // for (let iArrMPSZ = 0;iArrMPSZ < arrMPSZ.length;iArrMPSZ++) {
  //   if (arrMPSZ[iArrMPSZ] === '-') {
  //     // tileKey represents a space between tiles:

  //     xPosition = xPosition + (tileWidth / 2)

  //   } else if (/^[0-9XQ]?['][mpsxq]$|[1-7XQ]?['][z]/.test(arrMPSZ[iArrMPSZ])) {
  //     // tileKey represents a sideways tile, either a chii or pon tile:

  //     svgInner += `<image href="${tileDesigns['base']}" x="${- svgHeight}" y="${xPosition}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" /><image href="${tileDesigns[arrMPSZ[iArrMPSZ].replace(/[']/g, '')]}"  x="${- svgHeight}" y="${xPosition}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" />`

  //     xPosition += tileHeight + 1

  //   } else if (iArrMPSZ > 0
  //     && /^[0-9XQ]?[']{2}[mpsxq]$|[1-7XQ]?[']{2}[z]/.test(arrMPSZ[iArrMPSZ])
  //     && /^[0-9XQ]?['][mpsxq]$|[1-7XQ]?['][z]/.test(arrMPSZ[iArrMPSZ - 1])
  //   ) {

  //     svgInner += `<image href="${tileDesigns['base']}" x="${- svgHeight + tileWidth + 1}" y="${xPosition - tileHeight - 1}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" /><image href="${tileDesigns[arrMPSZ[iArrMPSZ].replace(/[']/g, '')]}"  x="${- svgHeight + tileWidth + 1}" y="${xPosition - tileHeight - 1}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" />`

  //   } else if (/^[0-9XQ]?["][mpsxq]$|[1-7XQ]?["][z]/.test(arrMPSZ[iArrMPSZ])) {
  //     // tileKey represents 2 sideways tiles in a shouminkan:

  //     svgInner += `<image href="${tileDesigns['base']}" x="${- svgHeight}" y="${xPosition}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" /><image href="${tileDesigns[arrMPSZ[iArrMPSZ].replace(/["]/g, '')]}"  x="${- svgHeight}" y="${xPosition}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" /><image href="${tileDesigns['base']}" x="${tileWidth - svgHeight + 1}" y="${xPosition}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" /><image href="${tileDesigns[arrMPSZ[iArrMPSZ].replace(/["]/g, '')]}"  x="${tileWidth - svgHeight + 1}" y="${xPosition}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90)" />`

  //     xPosition += tileHeight + 1

  //   } else if (/^[0-9XQ]?[mpsxq]$|[1-7XQ]?[z]/.test(arrMPSZ[iArrMPSZ])) {

  //     svgInner += `<image href="${tileDesigns['base']}" x="${xPosition}" y="${svgHeight - tileHeight}" width="${tileWidth}" height="${tileHeight}" /><image href="${tileDesigns[arrMPSZ[iArrMPSZ]]}" x="${xPosition}" y="${svgHeight - tileHeight}" width="${tileWidth}" height="${tileHeight}" />`

  //     xPosition += tileWidth + 1

  //   }

  // }
  // return `<svg width="${xPosition - 1}" height="${svgHeight}" style="display: block;">${svgInner}</svg>`
  console.log(arrMPSZ)
  return ``
}

export const merjongAPI = Object.freeze({
  render
})

export default merjongAPI
