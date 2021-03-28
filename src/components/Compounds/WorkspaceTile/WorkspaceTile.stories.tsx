import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { ICONS } from 'utilities/icons';
import { IWorkspaceTileProps } from './WorkspaceTile.types';
import WorkspaceTile from './WorkspaceTile';

const Template: Story<IWorkspaceTileProps> = (args: IWorkspaceTileProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <WorkspaceTile {...args} />
        </ThemeProvider>
    </Provider>
);

export const WorkspaceTileComponent = Template.bind({});
WorkspaceTileComponent.args = {
    expanded: false,
    selected: false,
} as IWorkspaceTileProps;

export default {
    title: 'Components/Compounds',
    component: WorkspaceTileComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
