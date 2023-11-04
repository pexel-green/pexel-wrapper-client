import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated;
};

export default useAuthRedirect;