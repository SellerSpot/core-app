import { css, keyframes as emotionKeyframes } from '@emotion/css';

/* animation keyframes */
const keyframes = {
    fadeIn: emotionKeyframes`
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    `,
};

/* animation names */
const names = {
    fadeIn: css`
        animation-name: ${keyframes.fadeIn};
    `,
};

/* animation durations */
const durations = {
    pointFiveSecond: css`
        animation-duration: 0.5s;
    `,

    oneSecond: css`
        animation-duration: 1s;
    `,

    onePointFiveSecond: css`
        animation-duration: 1.5s;
    `,
};

/* animation timing functions */
const timingFunctions = {
    linear: css`
        animation-timing-function: linear;
    `,

    ease: css`
        animation-timing-function: ease;
    `,

    easeIn: css`
        animation-timing-function: ease-in;
    `,

    easeOut: css`
        animation-timing-function: ease-out;
    `,

    easeInOut: css`
        animation-timing-function: ease-in-out;
    `,
};

export const animationStyles = {
    keyframes,
    names,
    durations,
    timingFunctions,
};
