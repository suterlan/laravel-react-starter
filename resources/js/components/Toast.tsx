import { Slide, toast, ToastContainer } from 'react-toastify';

const notify = {
	success: (message: string) => toast.success(message),
	error: (message: string) => toast.error(message),
	info: (message: string) => toast.info(message),
	warning: (message: string) => toast.warning(message),
};

const Toast = () => {

	return <ToastContainer theme={'light'} position="top-right" autoClose={3000} transition={Slide} />
};

export { Toast, notify };