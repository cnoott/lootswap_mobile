// @ts-nocheck
import {RefObject} from 'react';
export class Alert {
  static dropDown: RefObject<any>;
  static setDropDown(dropDown: RefObject<any>) {
    this.dropDown = dropDown;
  }
  static getDropDown() {
    return this.dropDown;
  }

  static showSuccess(message: string) {
    this?.dropDown?.alertWithType('success', '', `${message}`);
  }

  static showError(message: string) {
    this?.dropDown?.alertWithType('error', '', `${message}`);
  }
}
