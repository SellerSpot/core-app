import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { AppBar as AppBarComponent } from './AppBar';

const Template: Story = () => <AppBarComponent />;

export const AppBar = Template.bind({});

export default {
    title: 'Core App/Compounds/App Bar',
    component: AppBarComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
