import { ActionType } from '../constant/enum.js';

export interface Element {
  type: 'button' | 'input' | 'select' | 'textArea';
}

export interface Action {
  type: ActionType;
}

export interface RateControl {
  min?: number;
  max?: number;
}

//quy tắc
// action type là required
// nếu action type là RANDOM_PICK_WITH_OTHER_OPTION thì otherInputOptions là required
export interface ProcessNode {
  action: Action;
  text?: string;
  xPath?: string;
  rateControl?: RateControl;
  otherInputOptions?: string[];
}
