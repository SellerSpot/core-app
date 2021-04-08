import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import BreadCrumbsComponent from './BreadCrumbs';

const Template: Story = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <BreadCrumbsComponent
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

export const BreadCrumbs = Template.bind({});
BreadCrumbs.args = {};

export default {
    title: 'Components/Atoms',
    component: BreadCrumbsComponent,
} as Meta;
