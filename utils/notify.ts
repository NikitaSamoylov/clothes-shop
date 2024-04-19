import toast from 'react-hot-toast';

export const notifyError = (e: Error) => {
  toast(e.message)
};