import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import WorkSpaceMenu from './WorkSpaceMenu';
import { IWorkSpaceMenuProps } from './WorkSpaceMenu.types';

const Template: Story<IWorkSpaceMenuProps> = (args: IWorkSpaceMenuProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <WorkSpaceMenu {...args} />
        </ThemeProvider>
    </Provider>
);

export const WorkSpaceMenuComponent = Template.bind({});
WorkSpaceMenuComponent.args = {} as IWorkSpaceMenuProps;

export default {
    title: 'Components/Compounds/WorkSpaceMenu',
    component: WorkSpaceMenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
