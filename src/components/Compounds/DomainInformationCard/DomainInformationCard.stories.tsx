import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DomainInformationCardComponent from './DomainInformationCard';

const Template: Story = () => <DomainInformationCardComponent />;

export const DomainInformationCard = Template.bind({});

export default {
    title: 'Components',
    component: DomainInformationCardComponent,
} as Meta;
