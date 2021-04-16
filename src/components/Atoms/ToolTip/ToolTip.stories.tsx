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
    return (
        <ToolTipComponent title={'Sample Tooltip'} placement={'right'}>
            <div
                style={{
                    width: '100px',
                    height: '50px',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    backgroundColor: 'lightblue',
                    color: 'white',
                }}
            >
                Hover for demo
            </div>
        </ToolTipComponent>
    );
};

export const ToolTip = Template.bind({});
export default {
    title: 'Components/Atoms',
    component: ToolTipComponent,
} as Meta;
