import { css } from '@emotion/css';

export const getPointOfSaleDashboardStyles = (): {
    pointOfSaleDashboardWrappper: string;
    leftNavWrapper: string;
    mainBodyWrapper: string;
} => {
    const pointOfSaleDashboardWrappper = css`
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: grid;
        grid-template-columns: 300px 1fr;
    `;

    const leftNavWrapper = css`
        width: 100%;
        height: 100%;
    `;

    const mainBodyWrapper = css`
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 10px;
    `;

    return {
        pointOfSaleDashboardWrappper,
        leftNavWrapper,
        mainBodyWrapper,
    };
};
