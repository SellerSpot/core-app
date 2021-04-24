import { ICONS } from 'utilities/icons';
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { IAppBarProps } from './AppBar.types';
import AppBarComponent from './AppBar';

const Template: Story<IAppBarProps> = (args: IAppBarProps) => <AppBarComponent {...args} />;

export const AppBar = Template.bind({});
AppBar.args = {
    breadcrumbs: [
        {
            route: '/management',
            title: 'Management',
        },
        {
            route: '/profile',
            title: 'Profile',
        },
    ],
    currentWorkspace: {
        workspaceIcon: <ICONS.VscSettings />,
        workspaceTitle: 'Management',
    },
} as IAppBarProps;

export default {
    title: 'Components',
    component: AppBarComponent,
} as Meta;
