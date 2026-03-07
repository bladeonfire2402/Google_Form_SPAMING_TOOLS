import puppeteer, { Browser, Page } from 'puppeteer';
import baseConfig from '../config/index.config.js';
import { processConfig } from '../config/process.config.js';

const launchBrowser = async () => {
  const browser = await puppeteer.launch(baseConfig.browserOptions);
  return browser;
};

const terminateBrowser = async (browser: Browser) => {
  await browser.close();
};

const openWebsite = async (browser: Browser, url: string) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  return page;
};

const waitPageLoad = async () => {
  await new Promise((resolve) => setTimeout(resolve, processConfig.waitPageLoad));
};

const waitForAllLoad = async (page: Page) => {
  await page.waitForSelector('body', { timeout: processConfig.baseAwaitTimeout });
};

export default launchBrowser;
export { terminateBrowser, openWebsite, waitPageLoad, waitForAllLoad };
