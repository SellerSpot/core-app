import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import { store } from 'store/store';
import { App } from 'layouts/App/App';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';

import './styles/core.scss';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root'),
);
