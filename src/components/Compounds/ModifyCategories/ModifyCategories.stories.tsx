import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
    ModifyCategories as ModifyCategoriesComponent,
    IModifyCategoriesProps,
} from './ModifyCategories';

const Template: Story<IModifyCategoriesProps> = (args: IModifyCategoriesProps) => (
    <ModifyCategoriesComponent {...args} />
);

export const ModifyCategories = Template.bind({});
ModifyCategories.args = {
    categoriesData: [
        {
            name: 'Shirts',
            subCategories: [
                {
                    name: 'T-Shirts',
                },
                {
                    name: 'Formals',
                },
                {
                    name: 'Casuals',
                },
            ],
        },
        {
            name: 'Shoes',
            subCategories: [
                {
                    name: 'Casuals',
                    subCategories: [
                        {
                            name: 'Lace',
                        },
                        {
                            name: 'Velcro',
                        },
                    ],
                },
                {
                    name: 'Office',
                },
            ],
        },
    ],
} as IModifyCategoriesProps;

export default {
    title: 'Components',
    component: ModifyCategoriesComponent,
} as Meta;
