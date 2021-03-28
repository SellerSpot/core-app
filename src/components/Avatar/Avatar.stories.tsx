import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Avatar from './Avatar';
import { IAvatarProps } from './Avatar.types';
import { ICONS } from 'utilities/icons';

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
    style: {},
} as IAvatarProps;

export default {
    title: 'Components/Atoms',
    component: AvatarComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
