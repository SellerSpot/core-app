import { Meta, Story } from '@storybook/react/types-6-0';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import SaleSearchResultCardComponent from './SaleSearchResultCard';
import { ISaleSearchResultCard } from './SaleSearchResultCard.types';

const Template: Story = (args: ISaleSearchResultCard) => (
    <Provider store={store}>
        <ThemeProvider>
            <div
                style={{
                    width: '400px',
                }}
            >
                <SaleSearchResultCardComponent {...args} />
            </div>
        </ThemeProvider>
    </Provider>
);
export const SaleSearchResultCard = Template.bind({});
SaleSearchResultCard.args = {
    productName: 'Tomatoes',
    stockUnit: 'Kg',
    unitPrice: 200,
    productImage: 'https://i.ibb.co/MZMJMCn/Rectangle-18.png',
} as ISaleSearchResultCard;
export default {
    title: 'Components/Compounds',
    component: SaleSearchResultCardComponent,
} as Meta;
