import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import constants from '../config/constants';

const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  pauseOnHover: true
}

/**
 * Shows a toast msg.
  * @param type
  * @param msg
  * @param options (optional)
 */
function showToast(type, msg, options = {}) {
  const updatedOptions = { ...toastOptions, ...options };
  switch (type) {
    case constants.ui.toast.success:
      toast.success(msg, updatedOptions)
      break;
    case constants.ui.toast.warn:
      toast.warn(msg, updatedOptions)
      break;
    case constants.ui.toast.error:
      toast.error(msg, updatedOptions)
      break;
    case constants.ui.toast.info:
      toast.info(msg, updatedOptions)
      break;
    default:
      toast(msg, updatedOptions)
      break;
  }
}

const miscellaneousService = {
  showToast
}

export default miscellaneousService;
