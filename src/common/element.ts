import { ElementHandle, Page } from 'puppeteer';
import { processConfig } from '../config/process.config.js';
import { ActionType } from '../constant/enum.js';

const getElementByTitle = async (page: Page, title: string) => {
  try {
    const elements = await page.waitForSelector(`text/${title}`, {
      timeout: processConfig.baseAwaitTimeout,
    });

    return elements;
  } catch (error) {
    console.error('Error getting element by title:', error);
    return null;
  }
};

const getElementByXPath = async (page: Page, xPath: string) => {
  try {
    // Thêm tiền tố xpath/ nếu chưa có
    let xPathSelector = xPath.trim();
    if (!xPathSelector.startsWith('xpath/')) {
      xPathSelector = `xpath/${xPathSelector}`;
    }

    const element = await page.waitForSelector(xPathSelector, {
      timeout: processConfig.baseAwaitTimeout,
    });

    if (!element) {
      console.log('Element not found');
      return null;
    }

    return element;
  } catch (error) {
    console.error('Error getting element by XPath:', error);
    return null;
  }
};

const getWrapperElementByParent = async (child: ElementHandle, level?: number) => {
  level = level || 4;

  const wrapper = await child.evaluateHandle((el, levels) => {
    let current = el;
    // Lặp lại việc truy cập parentElement theo số level
    for (let i = 0; i < levels; i++) {
      if (!current?.parentElement) {
        return null;
      }
      current = current.parentElement;
    }
    return current;
  }, level);

  const wrapperElement = wrapper.asElement();
  if (!wrapperElement) {
    console.log('Wrapper element not found');
    return null;
  }

  return wrapperElement;
};

const getElementsRadioOptionsByParent = async (parent: ElementHandle) => {
  // Dùng $$ (2 dấu) để lấy TẤT CẢ elements, không chỉ element đầu tiên
  let options = await parent.$$('div[role="radio"]');

  if (!options || options.length === 0) {
    // Sửa selector: cần dấu ngoặc vuông [role="radio"] thay vì role="radio"
    options = await parent.$$('[role="radio"]');
  }

  if (!options || options.length === 0) {
    console.log('No radio options found');
    logElementInfo(parent);
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

  let range = elements.length;
  if (actionType === ActionType.RANDOM_PICK_WITHOUT_OTHER_OPTION) {
    range = elements.length - 1;
  }

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

const randomLikeHeartPickElement = async (elements: ElementHandle[]) => {
  if (!elements || elements.length === 0) {
    console.log('No elements to pick from');
    return null;
  }

  const rate = Math.random();
  let index = 0;

  if (rate < 0.2) {
    //20%
    index = Math.floor(Math.random() * 2) + 1;
  } else {
    index = Math.floor(Math.random() * 3) + 3; // 3-5
  }

  const arrayIndex = index - 1;

  // Kiểm tra index có hợp lệ không
  if (arrayIndex < 0 || arrayIndex >= elements.length) {
    console.log(`Invalid index: ${arrayIndex}, array length: ${elements.length}`);
    // Fallback: chọn random từ tất cả elements
    const randomIndex = Math.floor(Math.random() * elements.length);
    const selectedElement = elements[randomIndex];
    if (selectedElement) {
      await selectedElement.click();
    }
    return null;
  }

  const selectedElement = elements[arrayIndex];

  if (!selectedElement) {
    console.log('Selected element is null or undefined');
    return null;
  }

  try {
    await selectedElement.click();
  } catch (error) {
    console.error('Error clicking element:', error);
    throw error;
  }

  return null;
};

export {
  getElementByTitle,
  getElementByXPath,
  logElementInfo,
  getWrapperElementByParent,
  getElementsRadioOptionsByParent,
  randomPickElement,
  randomLikeHeartPickElement,
};
