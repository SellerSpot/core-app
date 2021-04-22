import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ICONS } from 'utilities/icons';
import WorkSpaceMenuComponent from './WorkSpaceMenu';
import { IWorkSpaceMenuProps } from './WorkSpaceMenu.types';

const Template: Story<IWorkSpaceMenuProps> = (args: IWorkSpaceMenuProps) => (
    <BrowserRouter>
        <div
            style={{
                padding: 0,
                margin: 0,
                width: '100%',
                height: '100vh',
            }}
        >
            <WorkSpaceMenuComponent {...args} />
        </div>
    </BrowserRouter>
);

export const WorkSpaceMenu = Template.bind({});
WorkSpaceMenu.args = {
    tiles: [
        {
            icon: <ICONS.MdHome />,
            title: 'Home',
            routesToWatch: ['/iframe.html'],
        },
        {
            icon: <ICONS.VscSettings />,
            title: 'Management',
        },
        {
            icon: <ICONS.FaCashRegister />,
            title: 'POS',
        },
        {
            icon: <ICONS.VscChecklist />,
            title: 'Catalogue',
        },
    ],
    storeInformation: {
        avatarContent: 'S',
        storeName:
            'Sreenithi Margin Free Store Store Store Test Store Store Store Store Store Test Store Store Store Store Store Test Store Store',
    },
} as IWorkSpaceMenuProps;

export default {
    title: 'Components',
    component: WorkSpaceMenuComponent,
} as Meta;
