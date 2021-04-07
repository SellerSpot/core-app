import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import AvatarComponent from './Avatar';
import { IAvatarProps } from './Avatar.types';

const Template: Story<IAvatarProps> = (args: IAvatarProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <AvatarComponent {...args} />
        </ThemeProvider>
    </Provider>
);

export const Avatar = Template.bind({});
Avatar.args = {
    content: <ICONS.WORKSPACES.HOME />,
    imgSrc: '',
    size: 'small',
    theme: 'selected',
    variant: 'rounded',
    className: '',
    disabled: false,
} as IAvatarProps;

export default {
    title: 'Components/Atoms',
    component: AvatarComponent,
} as Meta;
