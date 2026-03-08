/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProcessNode } from '../interface/element.js';
import { ActionType } from '../constant/enum.js';
import {
  getElementByTitle,
  getElementsRadioOptionsByParent,
  randomLikeHeartPickElement,
  randomPickElement,
} from './element.js';
import { waitForAllLoad } from './index.js';
import { Page } from 'puppeteer';
import { processConfig } from '../config/process.config.js';

const processHandler = async (processNode: ProcessNode, page: Page) => {
  console.log('processHandler', processNode.action.type);
  console.log('processNode', processNode);
  switch (processNode.action.type) {
    case ActionType.CLICK:
      await processClickHander(processNode, page);
      break;
    case ActionType.LOG_SECTION:
      logSectionHandler(processNode);
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
    case ActionType.PAUSE_THEN_GET_OUT:
      await processPauseThenGetOutHander(page);
      break;
    case ActionType.RANDOM_PICK_WITHOUT_OTHER_OPTION:
      await processRandomPickHander(processNode, page);
      break;
    case ActionType.RANDOM_LIKE_HEART_PICK:
      await processRandomLikeHeartPickHandler(processNode, page);
      break;
    case ActionType.SHORT_TIMEOUT:
      await processShortTimeoutHander();
      break;
    default:
      console.warn('Unknown action type:', processNode.action.type);
  }
};

const processShortTimeoutHander = async () => {
  await new Promise((resolve) => setTimeout(resolve, processConfig.shortTimeout));
};

const processPauseThenGetOutHander = async (page: Page) => {
  await waitForAllLoad(page);
  await page.close();
  return;
};

const logSectionHandler = (processNode: ProcessNode) => {
  if (!processNode.text) return;
  console.log('Log section:', processNode.text);
};

const processRandomLikeHeartPickHandler = async (processNode: ProcessNode, page: Page) => {
  if (!processNode.text) return;

  const element = await getElementByTitle(page, processNode.text);
  if (!element) {
    console.log('Element not found');
    return;
  }

  const wrapperHandle = await element.evaluateHandle(
    (el) => el.parentElement?.parentElement?.parentElement?.parentElement
  );

  if (!wrapperHandle) {
    console.log('Wrapper handle not found');
    return;
  }

  const wrapper = wrapperHandle.asElement();
  if (!wrapper) return;

  const options = await getElementsRadioOptionsByParent(wrapper);
  if (!options || options.length === 0) return;

  await randomLikeHeartPickElement(options);
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
  console.log('Process pick handler');
  if (!processNode.text) {
    console.log('Text not found');
    return;
  }

  if (processNode.defaultPickOption == null) {
    console.log('Default pick option not found');
    return;
  }

  const element = await getElementByTitle(page, processNode.text);
  if (!element) {
    console.log('Element not found');
    return;
  }

  // Lấy wrapper của element 4 cấp cha
  const wrapperHandle = await element.evaluateHandle(
    (el) => el.parentElement?.parentElement?.parentElement?.parentElement
  );
  if (!wrapperHandle) {
    console.log('Wrapper handle not found');
    return;
  }

  // Convert JSHandle to ElementHandle
  const wrapper = wrapperHandle.asElement();
  if (!wrapper) {
    console.log('Wrapper not found');
    return;
  }

  const options = await getElementsRadioOptionsByParent(wrapper);
  if (!options || options.length === 0) {
    console.log('Options not found');
    return;
  }

  const pickOption = options[processNode.defaultPickOption ?? 0];

  if (!pickOption) {
    console.log('Pick option not found at index');
    return;
  }

  await pickOption.click();
};

export { processHandler };
