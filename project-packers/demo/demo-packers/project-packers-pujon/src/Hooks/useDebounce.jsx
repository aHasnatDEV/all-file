import { useState, useEffect } from 'react';

/**
 * @param handleDebounce function handle debounce effect
 * accepts @param func the function in which debounce needs to be handled 
 * accepts @param delay the the time to wait for the effect
 * @returns the function
*/
function useDebounce(func, delay) {
    const [debouncedFunction, setDebouncedFunction] = useState(() => () => {});

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFunction(() => func);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [func, delay]);

    return debouncedFunction;
}

export default useDebounce;
