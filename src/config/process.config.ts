import { ActionType } from '../constant/enum.js';
import { ProcessNode } from '../interface/element.js';

const processConfig = {
  baseAwaitTimeout: 10000,
  baseTimeout: 30000,
  waitPageLoad: 3000,
};

const processFlowConfig: ProcessNode[] = [
  {
    action: {
      type: ActionType.CLICK,
    },
    text: 'Tiếp',
  },
  {
    action: {
      type: ActionType.PAUSE_A_WHILE_FOR_LOAD,
    },
  },
  //section 1
  {
    action: {
      type: ActionType.RANDOM_PICK,
    },
    text: '1.2. Giới tính của bạn là gì?/ What is your gender?',
  },
];

export { processFlowConfig, processConfig };
