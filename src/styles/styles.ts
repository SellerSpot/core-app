import { injectGlobal } from '@emotion/css';
// import openSansRegular from './fonts/OpenSans-Regular.ttf';
// import openSansBold from './fonts/OpenSans-Bold.ttf';
// import openSansLight from './fonts/OpenSans-Light.ttf';
// import openSansSemiBold from './fonts/OpenSans-Regular.ttf';
/* src: local('Open Sans') url(${openSans}) format('ttf');
src: local('Open Sans') url(${openSans}) format('ttf'); */

export const injectGlobalStyles = (): void => {
    injectGlobal` 
        * {
            margin: 0;
            padding: 0;
            vertical-align: baseline;
            box-sizing: border-box;
        }

        /* @font-face {
            font-family: 'Open Sans';
            font-weight: normal;
            src: local('Open Sans') url(./fonts/OpenSans-Regular.ttf) format('ttf');
        } */

    
        body {
            width: 100%;
            height: 100%;
            font-family: 'Open Sans', sans-serif;
        }
    `;
};
