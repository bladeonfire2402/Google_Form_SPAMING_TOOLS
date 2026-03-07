export enum ActionType {
  CLICK = 'click',
  //pick theo 1 lựa chọn mặc định
  PICK = 'pick',
  //cái action type cho loại câu hỏi cho chọn ngẫu nhiên
  RANDOM_PICK = 'randomPick',
  //cái action type cho loại câu hỏi cho chọn có thêm mục khác có thể nhập vào
  RANDOM_PICK_WITH_OTHER_OPTION = 'randomPickWithOtherOption',
  //cái action type cho loại câu hỏi cho chọn ngẫu nhiên theo thang likehear 1->5
  RANDOM_LIKE_HEART_PICK = 'randomLikeHeartPick',
  //cái action type cho loại câu hỏi cho chờ một lúc để load xong
  PAUSE_A_WHILE_FOR_LOAD = 'pauseALittleForLoad',
}
