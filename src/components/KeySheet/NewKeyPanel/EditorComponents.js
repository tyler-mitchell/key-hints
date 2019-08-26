import React from "react";
import { Paper } from "@material-ui/core";

export const modal = {
  id: "my-modal", // 必选属性，传入一个唯一字符串即可
  title: "我的弹窗", // 指定弹窗组件的顶部标题
  className: "my-modal", // 指定弹窗组件样式名
  width: 500, // 指定弹窗组件的宽度
  height: 500, // 指定弹窗组件的高度
  showFooter: true, // 指定是否显示弹窗组件底栏
  showCancel: true, // 指定是否显示取消按钮
  showConfirm: true, // 指定是否显示确认按钮
  confirmable: true, // 指定确认按钮是否可用
  showClose: true, // 指定是否显示右上角关闭按钮
  closeOnBlur: true, // 指定是否在点击蒙层后关闭弹窗(v2.1.24)
  closeOnConfirm: true, // 指定是否在点击确认按钮后关闭弹窗(v2.1.26)
  closeOnCancel: true, // 指定是否在点击取消按钮后关闭弹窗(v2.1.26)
  cancelText: "取消", // 指定取消按钮文字
  confirmText: "确定", // 指定确认按钮文字
  bottomText: null, // 指定弹窗组件底栏左侧的文字，可传入jsx
  onConfirm: () => {}, // 指定点击确认按钮后的回调函数
  onCancel: () => {}, // 指定点击取消按钮后的回调函数
  onClose: () => {}, // 指定弹窗被关闭后的回调函数
  onBlur: () => {}, // 指定蒙层被点击时的回调函数
  children: <Paper /> // 指定弹窗组件的内容组件
};

export const editorControls = [
  "undo",
  "redo",
  "separator",

  "bold",
  "italic",
  "underline",
  "separator",
  "text-color",
  "font-size",
  "line-height",
  "separator",
  "text-indent",
  "text-align",
  "separator",
  "link",
  "media",
  "emoji"
];
