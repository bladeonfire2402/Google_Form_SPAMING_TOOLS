import { ActionType } from '../constant/enum.js';
import { ProcessNode } from '../interface/element.js';

const processConfig = {
  baseAwaitTimeout: 10000,
  baseTimeout: 30000,
  waitPageLoad: 10000,
  shortTimeout: 1000,
};

const processFlowConfig: ProcessNode[] = [
  {
    action: {
      type: ActionType.LOG_SECTION,
    },
    text: 'Section mở đầu',
  },
  {
    action: {
      type: ActionType.CLICK,
    },
    text: 'Tiếp',
  },
  //section 1
  {
    action: {
      type: ActionType.LOG_SECTION,
    },
    text: 'Section 1',
  },
  {
    action: {
      type: ActionType.PAUSE_A_WHILE_FOR_LOAD,
    },
  },
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
      type: ActionType.RANDOM_PICK_WITHOUT_OTHER_OPTION,
    },
    text: '1.3. Bạn hiện đang sống ở đâu? / Where do you currently live',
  },
  {
    action: {
      type: ActionType.RANDOM_PICK_WITHOUT_OTHER_OPTION,
    },
    text: '1.4. Nghề nghiệp hiện tại của bạn là gì?/ What is your current occupation?',
  },
  {
    action: {
      type: ActionType.SHORT_TIMEOUT,
    },
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
      type: ActionType.LOG_SECTION,
    },
    text: 'Section 2',
  },
  {
    action: {
      type: ActionType.PAUSE_A_WHILE_FOR_LOAD,
    },
  },
  {
    action: {
      type: ActionType.PICK,
    },
    defaultPickOption: 0,
    text: 'Bạn đã từng sử dụng UCG trên Google Maps để tìm kiếm/quyết định chọn quán ăn chưa?/',
  },
  {
    action: {
      type: ActionType.SHORT_TIMEOUT,
    },
  },
  {
    action: {
      type: ActionType.CLICK,
    },
    text: 'Tiếp',
  },
  //section 3
  {
    action: {
      type: ActionType.LOG_SECTION,
    },
    text: 'Section 3',
  },
  {
    action: {
      type: ActionType.PAUSE_A_WHILE_FOR_LOAD,
    },
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'FV1:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'FV2:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'FV3:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'FV4:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'SV1:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'SV2:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'SV3:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'SV4.',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'EV1: Việc đọc các đánh giá và thông tin về các dịch vụ ăn uống trên Google Maps khiến tôi cảm thấy thích thú./',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'EV2:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'EV3:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PT1:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PT2:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PT3:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PI1:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PI2:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PI3:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PI4:',
  },
  {
    action: {
      type: ActionType.RANDOM_LIKE_HEART_PICK,
    },
    text: 'PI5:',
  },
];

export { processFlowConfig, processConfig };
