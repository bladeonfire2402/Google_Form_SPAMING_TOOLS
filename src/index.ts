import { ProcessNode } from './interface/element';
import { Page } from 'puppeteer';
import launchBrowser, {
  openWebsite,
  terminateBrowser,
  waitForAllLoad,
  waitPageLoad,
} from './common/index.js';
import { processHandler } from './common/process.js';
import { thuyLinhFlowConfig } from './config/process.config.js';
import { webSiteUrl } from './constant/index.js';
import { playNotificationSound } from './common/sound.js';

const runTimes = 6;

async function main() {
  for (let i = 0; i < runTimes; i++) {
    await Promise.all([runProcess()]);
  }
  await playNotificationSound();
  console.log(`Đã chạy xong tất cả các lần chạy ${runTimes} lần`);
}

const runProcess = async () => {
  let browser;
  try {
    browser = await launchBrowser();
    const page = await openWebsite(browser, webSiteUrl);
    await waitForAllLoad(page);
    await formFillProcess(page, thuyLinhFlowConfig);
    await waitPageLoad();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in runProcess:', errorMessage);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    throw error;
  } finally {
    if (browser) {
      await terminateBrowser(browser);
    }
  }
};

const formFillProcess = async (page: Page, processFlowConfig: ProcessNode[]) => {
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
