import { CSSProperties } from '@material-ui/styles';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BillHolder as BillHolderComponent } from './BillHolder';

const Template: Story = () => {
    const wrapperDivStyles: CSSProperties = {
        width: '100vw',
        height: '100vh',
    };
    return (
        <div style={wrapperDivStyles}>
            <BillHolderComponent />
        </div>
    );
};

export const BillHolder = Template.bind({});

export default {
    title: 'Components/Fullscreen',
    parameters: {
        layout: 'fullscreen',
    },
    component: BillHolderComponent,
} as Meta;
