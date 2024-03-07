import { closeSnackbar, enqueueSnackbar, useSnackbar } from 'notistack';
import { MdOutlineClose } from 'react-icons/md';

type SnackbarVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

export const useCustomSnackbar = (message: string, variant: SnackbarVariant) => {
  return enqueueSnackbar(message, {
    variant,
    autoHideDuration: 4000,
    preventDuplicate: true,
  });
};
