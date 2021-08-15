import { ISelectOption } from '@sellerspot/universal-components';
import { ISearchInventoryProductsResponse } from '@sellerspot/universal-types';
import { IInventorySliderModalDynamicValues } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal.service';
import { isEmpty } from 'lodash';
import { requests } from 'requests/requests';

interface ISearchInventoryProps {
    query: string;
}

type ISelectMeta = IInventorySliderModalDynamicValues['searchField']['selectedProduct']['meta'];

export class InventoryModalSearchFieldService {
    static convertSearchResultToISelect = (
        items: ISearchInventoryProductsResponse['data']['products'],
    ): ISelectOption<ISelectMeta>[] => {
        const { catalogueProducts, inventoryProducts } = items;
        let options: ISelectOption<ISelectMeta>[] = [];
        // adding products from inventory first
        if (!isEmpty(inventoryProducts)) {
            const inventoryOptions = inventoryProducts.map<ISelectOption<ISelectMeta>>(
                (inventoryItem) => {
                    return {
                        label: inventoryItem.name,
                        value: inventoryItem.id,
                        meta: {
                            type: 'inventoryProduct',
                        },
                    };
                },
            );
            options = options.concat(inventoryOptions);
        }
        // adding products from catalogue
        if (!isEmpty(catalogueProducts)) {
            const catalogueProductsOptions = catalogueProducts.map<ISelectOption<ISelectMeta>>(
                (catalogueProductItem) => {
                    return {
                        label: `Add product "${catalogueProductItem.name}" to inventory`,
                        value: catalogueProductItem.id,
                        meta: {
                            type: 'catalogueProduct',
                        },
                    };
                },
            );
            options = options.concat(catalogueProductsOptions);
        }
        return options;
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
