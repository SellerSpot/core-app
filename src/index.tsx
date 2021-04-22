import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import { App } from 'layouts/App/App';
import { store } from 'store/store';

import './styles/core.scss';
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
