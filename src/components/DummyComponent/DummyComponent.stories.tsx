import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DummyComponent,IDummyComponentProps } from './DummyComponent';

export default {
    title: 'Components',
    component: DummyComponent,
} as Meta;

const Template: Story<IDummyComponentProps> = (args: IDummyComponentProps) => <DummyComponent {...args} />;

export const DummyComponents = Template.bind({});
DummyComponents.args = {
    message: "Welcome to Core-App Storybook"
} as IDummyComponentProps;