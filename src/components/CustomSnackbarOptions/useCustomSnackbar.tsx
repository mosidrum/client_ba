import { closeSnackbar, enqueueSnackbar, useSnackbar } from 'notistack';
import { MdOutlineClose } from 'react-icons/md';

type SnackbarVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

const useCustomSnackbar = (message: string, variant: SnackbarVariant) => {
  return enqueueSnackbar(message, {
    variant,
    autoHideDuration: 5000,
    preventDuplicate: true,
    action: (key) => (
      <button onClick={() => closeSnackbar(key)}>
        <MdOutlineClose size={20} />
      </button>
    )
  });
};

export default useCustomSnackbar;
