import { COLORS } from 'config/colors';
import React from 'react';
import { showNotify } from 'store/models/notify';
import { store } from 'store/store';

export const showMessage = (
    message: string | JSX.Element,
    type: 'success' | 'danger' | 'info' | 'warning' | 'default' = 'default',
    timeOut = 3000,
): void => {
    store.dispatch(
        showNotify({
            content: (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: COLORS[`COLOR_${type.toUpperCase()}` as keyof typeof COLORS],
                        color: COLORS.FOREGROUND_WHITE,
                        padding: 10,
                        wordBreak: 'keep-all',
                        lineHeight: '18px',
                    }}
                >
                    {message}
                </div>
            ),
            timeOut,
            styles: {
                padding: 0,
                margin: 0,
                height: 'auto',
                minHeight: 'auto',
            },
        }),
    );
};
