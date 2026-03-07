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
    text: '1.1. Bạn thuộc nhóm tuổi nào dưới đây? / Which age group do you belong to?',
  },
  {
    action: {
      type: ActionType.RANDOM_PICK,
    },
    text: '1.2. Giới tính của bạn là gì?/ What is your gender?',
  },
  {
    action: {
      type: ActionType.RANDOM_PICK,
    },
    text: '1.3. Bạn hiện đang sống ở đâu? / Where do you currently live',
  },
  {
    action: {
      type: ActionType.RANDOM_PICK,
    },
    text: '1.4. Nghề nghiệp hiện tại của bạn là gì?/ What is your current occupation?',
  },
  {
    action: {
      type: ActionType.CLICK,
    },
    text: 'Tiếp',
  },
  //section 2
  {
    action: {
      type: ActionType.PAUSE_A_WHILE_FOR_LOAD,
    },
  },
  {
    action: {
      type: ActionType.PICK,
    },
    text: 'Bạn đã từng sử dụng UCG trên Google Maps để tìm kiếm/quyết định chọn quán ăn chưa?/ Have you ever used UGC on Google Maps to search for or decide on F&B services?',
  },
];

export { processFlowConfig, processConfig };
