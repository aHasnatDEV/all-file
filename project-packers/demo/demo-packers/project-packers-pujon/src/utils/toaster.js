import toast from 'react-hot-toast';
const toaster = ({ type, message }) => {
    toast[type](message, { id: message });
};

export default toaster;