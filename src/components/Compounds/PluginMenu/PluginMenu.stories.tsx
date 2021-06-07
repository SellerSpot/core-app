import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PluginMenu as PluginMenuComponent } from './PluginMenu';

const Template: Story = () => (
    <BrowserRouter>
        <div
            style={{
                padding: 0,
                margin: 0,
                width: '100%',
                height: '100vh',
            }}
        >
            <PluginMenuComponent />
        </div>
    </BrowserRouter>
);

export const PluginMenu = Template.bind({});

export default {
    title: 'Core App/Compounds/Plugin Menu',
    parameters: {
        layout: 'fullscreen',
    },
    component: PluginMenuComponent,
} as Meta;
