import launchBrowser, { terminateBrowser } from './common/index.js';

async function main() {
  const browser = await launchBrowser();
  await terminateBrowser(browser);
}

// Run the main function
main().catch(console.error);
