import { toast } from "react-toastify";

const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

export const notifySuccess = (text) =>toast.success(text,options);
export const notifyError = (text) =>toast.error(text,options);
export const notifyWarn = (text) =>toast.warn(text,options);
export const notifyInfo= (text) =>toast.info(text,options);