import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import Avatar from './Avatar';
import { IAvatarProps } from './Avatar.types';

const Template: Story<IAvatarProps> = (args: IAvatarProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <Avatar {...args} />
        </ThemeProvider>
    </Provider>
);

export const AvatarComponent = Template.bind({});
AvatarComponent.args = {
    content: <ICONS.HomeWorkspace />,
    imgSrc: '',
    theme: 'unselected',
    varient: 'rounded',
    className: '',
    disabled: false,
    style: {},
} as IAvatarProps;

export default {
    title: 'Components/Atoms/AvatarComponent',
    component: AvatarComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
