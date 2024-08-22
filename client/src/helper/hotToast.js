
import toast from 'react-hot-toast';

export const hotToastError = (msg) => {
    toast.error(msg, {
        style: {
          border: '1px solid #37665C',
          padding: '16px',
          color: '#37665C',
        },
        iconTheme: {
          primary: '#37665C',
          secondary: '#FFFAEE',
        },
        duration: 3000
      });
}
export const hotToastSuccess = (msg) => {
    toast.success(msg, {
        style: {
          border: '1px solid #37665C',
          padding: '16px',
          color: '#37665C',
        },
        iconTheme: {
          primary: '#37665C',
          secondary: '#FFFAEE',
        },
        duration: 3000
      });
}