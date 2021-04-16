import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import AppPreloader from './AppPreloader';

const Template: Story = () => (
    <div
        style={{
            padding: 0,
            margin: 0,
            width: '100%',
            height: '100vh',
        }}
    >
        <AppPreloader />
    </div>
);

export const AppPreloaderComponent = Template.bind({});
AppPreloaderComponent.args = {};

export default {
    title: 'Components/Atoms',
    component: AppPreloaderComponent,
} as Meta;
