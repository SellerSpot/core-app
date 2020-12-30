import { injectGlobal } from '@emotion/css';

export const injectGlobalStyles = (): void => {
    injectGlobal` 
        * {
            margin: 0;
            padding: 0;
            vertical-align: baseline;
            box-sizing: border-box;
        }
    
        body {
            width: 100%;
            height: 100%;
        }
    `;
};
