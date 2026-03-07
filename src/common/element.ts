import { ElementHandle, Page } from 'puppeteer';
import { processConfig } from '../config/process.config.js';
import { ActionType } from '../constant/enum.js';

const getElementByTitle = async (page: Page, title: string) => {
  const elements = await page.waitForSelector(`text/${title}`, {
    timeout: processConfig.baseAwaitTimeout,
  });
  if (!elements) {
    console.log('Element not found');
  }
  return elements;
};

const getElementByXPath = async (page: Page, xPath: string) => {
  const element = await page.waitForSelector(xPath, { timeout: processConfig.baseAwaitTimeout });

  if (!element) {
    console.log('Element not found');
  }
  return element;
};

const getElementsRadioOptionsByParent = async (parent: ElementHandle) => {
  // Dùng $$ (2 dấu) để lấy TẤT CẢ elements, không chỉ element đầu tiên
  let options = await parent.$$('div[role="radio"]');

  if (!options || options.length === 0) {
    options = await parent.$$('role="radio"');
  }

  if (!options || options.length === 0) {
    console.log('No radio options found');
  }
  return options; // Trả về mảng ElementHandle[]
};

const logElementInfo = async (element: ElementHandle) => {
  if (!element) {
    console.log('Element is null or undefined');
    return;
  }

  try {
    const info = await element.evaluate((el) => {
      const attributes: Record<string, string> = {};
      if (el.attributes) {
        for (let i = 0; i < el.attributes.length; i++) {
          const attr = el.attributes[i];
          attributes[attr.name] = attr.value;
        }
      }

      const boundingBox = el.getBoundingClientRect();

      return {
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        textContent: el.textContent?.trim().substring(0, 500), // Giới hạn 500 ký tự
        innerHTML: el.innerHTML?.substring(0, 500), // Giới hạn 500 ký tự
        outerHTML: el.outerHTML?.substring(0, 500), // Giới hạn 500 ký tự
        attributes,
        boundingBox: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height,
          top: boundingBox.top,
          left: boundingBox.left,
          right: boundingBox.right,
          bottom: boundingBox.bottom,
        },
      };
    });

    console.log('=== Element Info ===');
    console.log(JSON.stringify(info, null, 2));
    console.log('===================');
  } catch (error) {
    console.error('Error logging element info:', error);
  }
};

const randomPickElement = async (elements: ElementHandle[], actionType: ActionType) => {
  if (!elements || elements.length === 0) {
    console.log('No elements to pick from');
    return null;
  }

  const range =
    actionType === ActionType.RANDOM_PICK_WITH_OTHER_OPTION ? elements.length : elements.length - 1;

  // Chọn ngẫu nhiên một index
  const randomIndex = Math.floor(Math.random() * range);
  const selectedElement = elements[randomIndex];

  if (!selectedElement) {
    console.log('Selected element is null or undefined');
    return null;
  }

  await selectedElement.click();

  return;
};

export {
  getElementByTitle,
  getElementByXPath,
  logElementInfo,
  getElementsRadioOptionsByParent,
  randomPickElement,
};
