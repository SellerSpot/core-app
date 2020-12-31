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
    rotate180to0: emotionKeyframes`
        from {
            transform: rotate(180deg);
        } to {
            transform: rotate(0deg);
        }
    `,
    rotate0to180: emotionKeyframes`
        from {
            transform: rotate(0deg);
        } to {
            transform: rotate(180deg);
        }
    `,
    scalePoint5to1: emotionKeyframes`
        from {
            transform: scale(.5);
        } to {
            transform: scale(1);
        }
    `,
};

/* animation names */
const names = {
    fadeIn: css`
        animation-name: ${keyframes.fadeIn};
    `,
    rotate0to180: css`
        animation-name: ${keyframes.rotate0to180};
    `,
    rotate180to0: css`
        animation-name: ${keyframes.rotate180to0};
    `,
    scalePoint5to1: css`
        animation-name: ${keyframes.scalePoint5to1};
    `,
};

/* animation durations */
const durations = {
    pointTwoSecond: css`
        animation-duration: 0.2s;
    `,

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

/* animation utils */
const utils = {
    combine: (...args: string[]): string => {
        return css`
            animation-name: ${args.join(', ')};
        `;
    },
};

export const animationStyles = {
    keyframes,
    names,
    durations,
    timingFunctions,
    utils,
};
