import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Loader } from './Loader';

export default {
    title: 'Components',
    component: Loader,
} as Meta;

const Template: Story<unknown> = (args: unknown) => <Loader {...args} />;

export const LoaderComponent = Template.bind({});
LoaderComponent.args = {} as unknown;
