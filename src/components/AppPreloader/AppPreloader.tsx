import { CircularProgress } from '@material-ui/core';
import React from 'react';
import appPreloaderStyles from './appPreloader.module.scss';

export default function AppPreloader(): JSX.Element {
    return (
        <div className={appPreloaderStyles.container}>
            <CircularProgress />
        </div>
    );
}
