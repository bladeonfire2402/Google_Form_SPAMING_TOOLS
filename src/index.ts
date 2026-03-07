import { Page } from 'puppeteer';
import launchBrowser, {
  openWebsite,
  terminateBrowser,
  waitForAllLoad,
  waitPageLoad,
} from './common/index.js';
import { processHandler } from './common/process.js';
import { processFlowConfig } from './config/process.config.js';
import { webSiteUrl } from './constant/index.js';

async function main() {
  const browser = await launchBrowser();
  const page = await openWebsite(browser, webSiteUrl);
  await waitForAllLoad(page);
  await formFillProcess(page);
  await waitPageLoad();
  await waitPageLoad();
  await waitPageLoad();

  await terminateBrowser(browser);
}

const formFillProcess = async (page: Page) => {
  for (let i = 0; i < processFlowConfig.length; i++) {
    const node = processFlowConfig[i];
    if (!node) {
      continue; // Bỏ qua nếu node là undefined
    }
    try {
      await processHandler(node, page);
    } catch (error) {
      console.error('Error processing node:', error);
      break;
    }
  }
};

main().catch(console.error);
