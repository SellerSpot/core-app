import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DeleteStoreCardComponent from './DeleteStoreCard';

const Template: Story = () => <DeleteStoreCardComponent />;

export const DeleteStoreCard = Template.bind({});

export default {
    title: 'Design System/Compounds/Delete Store Card',
    component: DeleteStoreCardComponent,
} as Meta;
