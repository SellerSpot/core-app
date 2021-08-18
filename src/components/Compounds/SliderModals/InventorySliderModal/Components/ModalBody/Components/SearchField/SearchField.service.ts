import { isEmpty } from 'lodash';
import { requests } from 'requests/requests';
import { ISelectOption } from '@sellerspot/universal-components';
import { IProductData, ISearchInventoryProductsResponse } from '@sellerspot/universal-types';
import { ISearchInventorySelectMeta } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.types';

interface ISearchInventoryProps {
    query: string;
}

export class InventoryModalSearchFieldService {
    static convertSearchResultToISelect = (
        items: ISearchInventoryProductsResponse['data']['products'],
    ): ISelectOption<ISearchInventorySelectMeta>[] => {
        const { catalogueProducts, inventoryProducts } = items;
        let options: ISelectOption<ISearchInventorySelectMeta>[] = [];
        // adding products from inventory first
        if (!isEmpty(inventoryProducts)) {
            const inventoryOptions = inventoryProducts.map<
                ISelectOption<ISearchInventorySelectMeta>
            >((inventoryItem) => {
                return {
                    label: inventoryItem.name,
                    value: inventoryItem.id,
                    meta: {
                        type: 'inventoryProduct',
                    },
                };
            });
            options = options.concat(inventoryOptions);
        }
        // adding products from catalogue
        if (!isEmpty(catalogueProducts)) {
            const catalogueProductsOptions = catalogueProducts.map<
                ISelectOption<ISearchInventorySelectMeta>
            >((catalogueProductItem) => {
                return {
                    label: `Add product "${catalogueProductItem.name}" to inventory`,
                    value: catalogueProductItem.id,
                    meta: {
                        type: 'catalogueProduct',
                    },
                };
            });
            options = options.concat(catalogueProductsOptions);
        }
        return options;
    };

    static convertIProductDataToISelectOption = (
        productData: IProductData,
    ): ISelectOption<ISearchInventorySelectMeta> => {
        return {
            label: productData.name,
            value: productData.id,
            meta: {
                type: 'catalogueProduct',
            },
        };
    };

    static searchInventory = async (
        props: ISearchInventoryProps,
    ): Promise<ISearchInventoryProductsResponse['data']> => {
        // props
        const { query } = props;
        // request
        const { status, data } = await requests.pos.inventoryRequest.searchProduct(query);
        if (status) {
            return data;
        }
        // compute
        return null;
    };
}
