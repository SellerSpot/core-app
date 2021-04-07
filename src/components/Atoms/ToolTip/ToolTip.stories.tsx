import { TooltipProps } from '@material-ui/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import { colorThemes } from 'config/themes';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { themeSelector } from 'store/models/theme';
import { store } from 'store/store';
import ToolTipComponent from './ToolTip';

const Template: Story<TooltipProps> = () => {
    const themeState = useSelector(themeSelector);
    return (
        <Provider store={store}>
            <ThemeProvider>
                <ToolTipComponent title={'Sample Tooltip'} placement={'right'}>
                    <div
                        style={{
                            width: '200px',
                            height: '50px',
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5px',
                            backgroundColor: colorThemes[themeState.colorTheme].primaryLight,
                            color: colorThemes[themeState.colorTheme].primary,
                        }}
                    >
                        Hover for demo
                    </div>
                </ToolTipComponent>
            </ThemeProvider>
        </Provider>
    );
};

export const ToolTip = Template.bind({});
export default {
    title: 'Components/Atoms',
    component: ToolTipComponent,
    parameters: {
        layout: 'padded',
    },
} as Meta;
