import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ICONS } from 'utilities/icons';

import AppBarComponent from './AppBar';
import { IAppBarProps } from './AppBar.types';

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
