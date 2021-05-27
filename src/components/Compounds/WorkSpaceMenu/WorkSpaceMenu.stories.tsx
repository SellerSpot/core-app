import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WorkSpaceMenu as WorkSpaceMenuComponent } from './WorkSpaceMenu';

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
            <WorkSpaceMenuComponent />
        </div>
    </BrowserRouter>
);

export const WorkSpaceMenu = Template.bind({});

export default {
    title: 'Design System/Compounds/Work Space Menu',
    parameters: {
        layout: 'fullscreen',
    },
    component: WorkSpaceMenuComponent,
} as Meta;
