import { merjongAPI } from './merjongAPI.js';
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
        element.innerHTML = await merjongAPI.render(mpsz);
    }
};
const run = async (options = { querySelector: '.merjong' }) => {
    await runThrowsErrors(options);
};
const merjong = {
    run
};
export default merjong;
