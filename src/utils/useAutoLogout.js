// hooks/useAutoLogout.js

import { useEffect } from 'react';
import { removeToken } from './cookie';
import { fetchFamiliesDetSuccess } from '../network/actions/familyDetailApi';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes


const useAutoLogout = () => {
    // const dispatch = useDispatch()
    const router = useRouter()
    const logout = () => {

        removeToken();
        // dispatch(fetchFamiliesDetSuccess({}))
        setTimeout(function () {
            // window.location.pathname == "/login"
            router.push("/login");
        }, 1000);
    }

    useEffect(() => {
        let timer;
        const resetTimer = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(logout, AUTO_LOGOUT_TIME);
        };

        // Set up event listeners for user activity
        const events = ['click', 'keypress', 'mousemove', 'scroll', 'touchstart'];
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        // Initialize the timer when the component mounts
        resetTimer();

        // Clean up
        return () => {
            clearTimeout(timer);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, []);
};

export default useAutoLogout;
