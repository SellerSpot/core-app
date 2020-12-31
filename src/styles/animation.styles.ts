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

/* animation compose utils */
const compose = {
    /**
     *
     * @param args list of animation keyframes will be shown as suggestions(it will (be keyof typeof animationstyles.keyframes))
     * @example
     * ```ts
     * className={animationStyles.compose.animate('fadeIn', 'popIn')} // set of the keyframes will be shown via intellisense
     *
     * ```
     */
    animate: (...args: (keyof typeof keyframes)[]): string => {
        return css`
            animation-name: ${args.map((arg) => keyframes[arg]).join(', ')};
        `;
    },
    /**
     *
     * @param args list of duration in seconds (numeric) corresponding to the animate compose utils
     * @example
     * ```ts
     * className={animationStyles.compose.duration(0.5, 2)}  // note her 0.5 corresponds to animation keyframe one and 2 corresponds to animation keyframe two composed using animationStyles.compose.aniamte() util
     *
     * ```
     */
    duration: (...args: number[]): string => {
        return css`
            animation-duration: ${args.map((arg) => `${arg}s`).join(', ')};
        `;
    },
};

export const animationStyles = {
    keyframes,
    timingFunctions,
    compose,
};
