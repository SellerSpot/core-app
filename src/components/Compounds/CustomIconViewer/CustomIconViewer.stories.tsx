import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    CustomIconViewer as CustomIconViewerComponent,
    ICustomIconViewerProps,
} from './CustomIconViewer';

const Template: Story<ICustomIconViewerProps> = (args: ICustomIconViewerProps) => (
    <CustomIconViewerComponent {...args} />
);

export const CustomIconViewer = Template.bind({});
CustomIconViewer.args = {
    color: 'black',
    icon: 'HomeWorkSpaceIcon',
    size: '24px',
} as ICustomIconViewerProps;

export default {
    title: 'Design System/Compounds/Custom Icon Viewer',
    component: CustomIconViewerComponent,
} as Meta;
