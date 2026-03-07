import puppeteer, { Browser } from 'puppeteer';
import baseConfig from '../config/index.config.js';

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

export default launchBrowser;
export { terminateBrowser, openWebsite };
