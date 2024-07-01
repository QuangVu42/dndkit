import { keyframes } from '@emotion/react';
export const bgLinearGradient = keyframes({
    '0%': {
        backgroundPosition: '0% 50%',
    },
    '50%': {
        backgroundPosition: '100% 50%',
    },
    '100%': {
        backgroundPosition: '0% 50%',
    },
});

export const bgLinearGradientInfinity = `${bgLinearGradient} 2s infinite linear`;
