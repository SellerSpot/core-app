import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DeleteAccountCardComponent from './DeleteAccountCard';

const Template: Story = () => <DeleteAccountCardComponent />;

export const DeleteAccountCard = Template.bind({});

export default {
    title: 'Components',
    component: DeleteAccountCardComponent,
} as Meta;
