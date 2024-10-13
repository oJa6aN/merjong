const contentLoaded = () => {
    merjong.run();
};
if (typeof document !== 'undefined') {
    // ! Wait for document loaded before starting the execution
    window.addEventListener('load', contentLoaded, false);
}
const runThrowsErrors = async ({ querySelector = '.mermaid' }) => {
    let nodesToProcess;
    nodesToProcess = document.querySelectorAll(querySelector);
    for (const element of Array.from(nodesToProcess)) {
        const mpsz = element.innerHTML.trim();
        const svg = await render(mpsz);
        element.innerHTML = svg;
    }
};
const run = async (options = { querySelector: '.merjong' }) => {
    await runThrowsErrors(options);
};
const arrangeMPSZ = (mpsz) => {
    mpsz = mpsz.replaceAll('?', 'Q');
    const arrMPSZ = [];
    const suitGroupRegex = /[0-9XQ][0-9XQ'"]*[mspzxq]|-|['"]?[xq]/g;
    const numberQuoteRegex = /[0-9XQ](?:'{0,2}|")/g;
    const suitGroups = mpsz.match(suitGroupRegex) || [];
    suitGroups.forEach(sameSuitGroup => {
        switch (sameSuitGroup) {
            case 'x':
            case 'q':
            case '-':
                arrMPSZ.push(sameSuitGroup);
                break;
            default:
                const suit = sameSuitGroup.slice(-1);
                const numbersWithQuote = sameSuitGroup.match(numberQuoteRegex) || [];
                numbersWithQuote.forEach(numberWithQuote => {
                    switch (numberWithQuote[0]) {
                        case 'Q':
                            arrMPSZ.push('q');
                            break;
                        case 'X':
                            arrMPSZ.push('x');
                            break;
                        default:
                            arrMPSZ.push(`${numberWithQuote}${suit}`);
                    }
                });
        }
    });
    return arrMPSZ;
};
const render = (mpsz) => {
    // const theme = themes.default.getThemeVariables()
    // const tileDesigns = theme.tileDesigns
    // const tileWidth = 36
    // const tileHeight = 48
    // let xPosition = 0
    // let svgContent = ''
    // const arrMPSZ = arrangeMPSZ(mpsz)
    // let preTileKey = ''
    // for (let i = 0;i < arrMPSZ.length;i++) {
    //   const tileKey = arrMPSZ[i]
    //   if (tileKey === '-') {
    //     xPosition = xPosition + (tileWidth / 2)
    //   } else if (/^\d?['][a-z]$/.test(tileKey)) {
    //   } else {
    //     svgContent += `<image href="${tileDesigns['base']}" x="${xPosition}" y="0" width="${tileWidth}" height="${tileHeight}" /><image href="${tileDesigns[tileKey]}" x="${xPosition}" y="0" width="${tileWidth}" height="${tileHeight}" />`
    //     xPosition = xPosition + tileWidth + 1
    //   }
    // }
    // // arrMPSZ.forEach((tileKey) => {
    // //   if (tileKey === '-') {
    // //     xPosition = xPosition + (tileWidth / 2)
    // //   } else if (/^\d?['][a-z]$/.test(tileKey)) {
    // //     if (
    // //       /^\d?['][a-z]$/.test(tileKey)
    // //       && (tileKey === preTileKey
    // //         || (tileKey.slice(-1) === preTileKey.slice(-1)
    // //           && /^[05X]['][a-z]$/.test(tileKey)
    // //           && /^[05X]['][a-z]$/.test(preTileKey))
    // //       )
    // //     ) {
    // //       xPosition = xPosition - tileHeight - 1
    // //     }
    // //     const tileKeyWoQuote = tileKey.replace(/['"]/g, '')
    // //     svgContent += `<image href="${tileDesigns['base']}" x="${xPosition}" y="${tileHeight}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90, ${xPosition}, ${tileHeight})" /><image href="${tileDesigns[tileKeyWoQuote]}" x="${xPosition}" y="${tileHeight}" width="${tileWidth}" height="${tileHeight}" transform="rotate(-90, ${xPosition}, ${tileHeight})" />`
    // //     xPosition = xPosition + tileHeight + 1
    // //   } else {
    // //     svgContent += `<image href="${tileDesigns['base']}" x="${xPosition}" y="0" width="${tileWidth}" height="${tileHeight}" /><image href="${tileDesigns[tileKey]}" x="${xPosition}" y="0" width="${tileWidth}" height="${tileHeight}" />`
    // //     xPosition = xPosition + tileWidth + 1
    // //   }
    // //   preTileKey = tileKey
    // // })
    // return `<svg width="${xPosition - 1}" height="${tileHeight}">${svgContent}</svg>`
    return "";
};
const merjong = {
    run
};
export default merjong;
console.log(arrangeMPSZ(`X5'0''Xm`));
