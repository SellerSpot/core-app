import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeSetter/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { BreadCrumbs } from './BreadCrumbs';

const Template: Story = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <BreadCrumbs
                    crumbs={[
                        {
                            title: 'Point Of Sale',
                            route: '/pos',
                        },
                        {
                            title: 'Sales',
                            route: '/pos/sales',
                        },
                        {
                            title: 'New Sale',
                            route: '/pos/sales/newsale',
                        },
                    ]}
                />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export const Component = Template.bind({});
Component.args = {};

export default {
    title: 'Components/Atoms/Breadcrumbs',
    component: Component,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;
