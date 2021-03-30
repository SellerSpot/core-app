import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import WorkSpaceIndicator from './WorkSpaceIndicator';
import { IWorkSpaceIndicatorProps } from './WorkSpaceIndicator.types';

const Template: Story<IWorkSpaceIndicatorProps> = (args: IWorkSpaceIndicatorProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <WorkSpaceIndicator {...args} />
        </ThemeProvider>
    </Provider>
);

export const Component = Template.bind({});
Component.args = {} as IWorkSpaceIndicatorProps;

export default {
    title: 'Components/Atoms/WorkSpaceIndicator',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
