import { ProcessNode } from '../interface/element.js';
import { Page } from 'puppeteer';
import { ActionType } from '../constant/enum.js';
import {
  getElementByTitle,
  getElementsRadioOptionsByParent,
  randomPickElement,
} from './element.js';
import { waitForAllLoad } from './index.js';

const processHandler = async (processNode: ProcessNode, page: Page) => {
  switch (processNode.action.type) {
    case ActionType.CLICK:
      await processClickHander(processNode, page);
      break;
    case ActionType.PICK:
      await processPickHandler(processNode, page);
      break;
    case ActionType.PAUSE_A_WHILE_FOR_LOAD:
      await processPauseALittleForLoadHander(page);
      break;
    case ActionType.RANDOM_PICK:
      await processRandomPickHander(processNode, page);
      break;
    default:
      console.warn('Unknown action type:', processNode.action.type);
  }
};

const processPauseALittleForLoadHander = async (page: Page) => {
  await waitForAllLoad(page);
};

const processClickHander = async (processNode: ProcessNode, page: Page) => {
  if (!processNode.text) return;

  const element = await getElementByTitle(page, processNode.text);
  if (!element) return;

  await element.click();
};

const processRandomPickHander = async (processNode: ProcessNode, page: Page) => {
  if (!processNode.text) return;

  const element = await getElementByTitle(page, processNode.text);
  if (!element) return;

  // Lấy wrapper của element 4 cấp cha
  const wrapperHandle = await element.evaluateHandle(
    (el) => el.parentElement?.parentElement?.parentElement?.parentElement
  );
  if (!wrapperHandle) return;

  // Convert JSHandle to ElementHandle
  const wrapper = wrapperHandle.asElement();
  if (!wrapper) return;

  const options = await getElementsRadioOptionsByParent(wrapper);
  if (!options || options.length === 0) return;

  await randomPickElement(options, processNode.action.type);
};

const processPickHandler = async (processNode: ProcessNode, page: Page) => {
  if (!processNode.text) return;

  if (!processNode.defaultPickOption) {
    return;
  }

  const element = await getElementByTitle(page, processNode.text);
  if (!element) return;

  // Lấy wrapper của element 4 cấp cha
  const wrapperHandle = await element.evaluateHandle(
    (el) => el.parentElement?.parentElement?.parentElement?.parentElement
  );
  if (!wrapperHandle) return;

  // Convert JSHandle to ElementHandle
  const wrapper = wrapperHandle.asElement();
  if (!wrapper) return;

  const options = await getElementsRadioOptionsByParent(wrapper);
  if (!options || options.length === 0) return;

  const pickIndex = processNode.defaultPickOption ?? 1;
  const pickOption = options[pickIndex];

  if (pickOption) {
    await pickOption.click();
  }
};

export { processHandler };
