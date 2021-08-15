import { useTheme } from 'customHooks/useTheme';
import React from 'react';
import { ReactElement } from 'react';

const NoImage = (): ReactElement => {
    const { colors } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
        >
            <rect x="0" y="0" width="32" height="32" fill="none" stroke="none" />
            <path
                d="M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414zM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414z"
                fill={colors.foregroundTertiary}
            />
            <path
                d="M6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2.002 2.002 0 0 0-2 2v16z"
                fill={colors.foregroundTertiary}
            />
        </svg>
    );
};

export default NoImage;
