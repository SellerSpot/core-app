import { CircularProgress } from '@material-ui/core';
import React, { ReactElement } from 'react';
import appPreloaderStyles from './appPreloader.module.scss';

export default function AppPreloader(): ReactElement {
    return (
        <div className={appPreloaderStyles.container}>
            <CircularProgress />
        </div>
    );
}
