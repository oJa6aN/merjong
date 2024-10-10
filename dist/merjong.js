const contentLoaded = () => {
    merjong.run();
};
if (typeof document !== 'undefined') {
    // ! Wait for document loaded before starting the execution
    window.addEventListener('load', contentLoaded, false);
}
const run = async (options = { querySelector: '.merjong' }) => {
    console.log(this);
    await runThrowsErrors(options);
};
const runThrowsErrors = async ({ querySelector = '.mermaid' }) => {
    const nodesToProcess = document.querySelectorAll(querySelector);
    for (const element of Array.from(nodesToProcess)) {
        console.log(element.innerHTML);
    }
};
const merjong = {
    run
};
export default merjong;
