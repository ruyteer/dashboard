import { toast } from "react-toastify";

function successToast(message) {
  toast(message, {
    theme: "dark",
    type: "success",
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    autoClose: 2000,
  });
}

function alertToast(message) {
  toast(message, {
    theme: "dark",
    type: "warning",
    pauseOnFocusLoss: false,
    pauseOnHover: false,
  });
}

function errorToast(message) {
  toast(message, {
    theme: "dark",
    type: "error",
    pauseOnFocusLoss: false,
    pauseOnHover: false,
  });
}

export { successToast, errorToast, alertToast };
