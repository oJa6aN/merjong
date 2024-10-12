import themes from './themes/index.js';
const contentLoaded = () => {
    merjong.run();
};
if (typeof document !== 'undefined') {
    // ! Wait for document loaded before starting the execution
    window.addEventListener('load', contentLoaded, false);
}
const runThrowsErrors = async ({ querySelector = '.mermaid' }) => {
    const nodesToProcess = document.querySelectorAll(querySelector);
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
    mpsz = mpsz.replaceAll("?", "Q");
    const result = [];
    const suitGroupRegex = /[0-9XQ][0-9XQ'"]*[mspzxq]|-|['"]?[xq]/g;
    const numberQuoteRegex = /[0-9XQ]['"]?/g;
    const suitGroups = mpsz.match(suitGroupRegex) || [];
    suitGroups.forEach(sameSuitGroup => {
        switch (sameSuitGroup) {
            case 'x':
            case 'q':
            case '-':
                result.push(sameSuitGroup);
                break;
            default:
                const numbersWithQuote = sameSuitGroup.match(numberQuoteRegex) || [];
                const suit = sameSuitGroup.slice(-1);
                numbersWithQuote.forEach(numberWithQuote => {
                    result.push(`${numberWithQuote}${suit}`);
                });
                break;
        }
    });
    return result;
};
const render = (mpsz) => {
    const theme = themes.default.getThemeVariables();
    const tileDesigns = theme.tileDesigns;
    const tileWidth = 36;
    const tileHeight = 48;
    let svgContent = '';
    const arrMPSZ = arrangeMPSZ(mpsz);
    arrMPSZ.forEach((tile, index) => {
        const xPosition = index * (tileWidth + 1) + 1;
        svgContent += `<image href="${tileDesigns['base']}" x="${xPosition}" y="1" width="${tileWidth}" height="${tileHeight}" /><image href="${tileDesigns[tile]}" x="${xPosition}" y="1" width="${tileWidth}" height="${tileHeight}" />`;
    });
    return `<svg  style="background-color: #008800" width="${(tileWidth + 1) * arrMPSZ.length + 1}" height="${tileHeight + 2}">${svgContent}</svg>`;
};
const merjong = {
    run
};
export default merjong;
