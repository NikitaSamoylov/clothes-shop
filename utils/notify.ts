import toast from 'react-hot-toast';

export const notifyError = (e: Error) => {
  toast(e.message)
};

export const notifyInfo = (e: string) => {
  toast(e)
};