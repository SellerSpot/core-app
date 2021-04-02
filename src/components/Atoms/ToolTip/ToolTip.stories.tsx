import { TooltipProps } from '@material-ui/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import { colorThemes } from 'config/themes';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ToolTip from './ToolTip';

const Template: Story<TooltipProps> = () => (
    <Provider store={store}>
        <ThemeProvider>
            <ToolTip title={'Sample Tooltip'} placement={'right'}>
                <div
                    style={{
                        width: '200px',
                        height: '50px',
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '5px',
                        backgroundColor: colorThemes.default.primaryLight,
                        color: colorThemes.default.primary,
                    }}
                >
                    Hover for demo
                </div>
            </ToolTip>
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
export default {
    title: 'Components/Atoms/ToolTip',
    component: Component,
} as Meta;
