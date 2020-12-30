import { css } from '@emotion/css';
export const getSignInStyles = (): {
    signInWrapper: string;
    signInContainer: string;
    signInTitle: string;
    formContainer: string;
    inputGroup: string;
    redirectActionHolder: string;
    forgotPasswordHolder: string;
} => {
    const signInWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: relative;
    `;
    const signInContainer = css`
        text-align: left;
        margin-top: 20%;
        width: 500px;
    `;
    const signInTitle = css`
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 25px;
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
    /* forgot password holder */
    const forgotPasswordHolder = css`
        position: absolute;
        top: 0;
        right: 0;
    `;

    return {
        signInWrapper,
        signInContainer,
        signInTitle,
        formContainer,
        inputGroup,
        redirectActionHolder,
        forgotPasswordHolder,
    };
};
