import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Submenu from './Submenu';
import { ISubmenuProps } from './Submenu.types';

const Template: Story<ISubmenuProps> = (args: ISubmenuProps) => (
    <Provider store={store}>
        <ThemeProvider>
            <div
                style={{
                    padding: 0,
                    margin: 0,
                    width: '100%',
                    height: '100vh',
                }}
            >
                {' '}
                <Submenu {...args} />
            </div>
        </ThemeProvider>
    </Provider>
);

export const SubmenuComponent = Template.bind({});
SubmenuComponent.args = {} as ISubmenuProps;

export default {
    title: 'Components/Compounds',
    component: SubmenuComponent,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
