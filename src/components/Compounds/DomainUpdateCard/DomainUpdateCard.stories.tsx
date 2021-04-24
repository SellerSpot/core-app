import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DomainUpdateCardComponent from './DomainUpdateCard';

const Template: Story = () => <DomainUpdateCardComponent />;

export const DomainUpdateCard = Template.bind({});

export default {
    title: 'Components',
    component: DomainUpdateCardComponent,
} as Meta;
