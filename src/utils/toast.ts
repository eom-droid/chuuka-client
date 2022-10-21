import { createToast, withProps, ToastOptions } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
// import CustomizedContent from "./CustomizedContent.vue";

const DEFAULT_SETTINGS: ToastOptions = {
  showIcon: true,
  transition: "zoom",
  position: "top-center",
  showCloseButton: false,
};

export const toastDefault = (content: string) =>
  createToast(content, { ...DEFAULT_SETTINGS, timeout: 3000 });

export const toastInfo = (content: string) =>
  createToast(content, { ...DEFAULT_SETTINGS, type: "info", timeout: 3000 });

export const toastDanger = (content: string) =>
  createToast(content, { ...DEFAULT_SETTINGS, type: "danger", timeout: 8000 });

export const toastWarning = (content: string) =>
  createToast(content, { ...DEFAULT_SETTINGS, type: "warning", timeout: 5000 });

export const toastSuccess = (content: string) =>
  createToast(content, { ...DEFAULT_SETTINGS, type: "success", timeout: 3000 });
