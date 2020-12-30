import { css } from '@emotion/css';

export const getForgotStyles = (): {
    forgotWrapper: string;
    forgotContainer: string;
    forgotTitle: string;
    forgotInstructions: string;
    formContainer: string;
    inputGroup: string;
    redirectActionHolder: string;
} => {
    const forgotWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: relative;
    `;

    const forgotContainer = css`
        text-align: left;
        margin-top: 20%;
        width: 500px;
    `;

    const forgotTitle = css`
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 25px;
    `;

    const forgotInstructions = css`
        margin-top: 20px;
        font-size: 20px;
        text-align: left;
    `;

    const formContainer = css`
        position: relative;
    `;

    const inputGroup = css`
        position: relative;
        margin-top: 25px;
    `;

    /* redirect action */
    const redirectActionHolder = css`
        position: absolute;
        font-size: 20px;
        width: auto;
        top: 20px;
        right: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    return {
        forgotWrapper,
        forgotContainer,
        forgotTitle,
        forgotInstructions,
        formContainer,
        inputGroup,
        redirectActionHolder,
    };
};
