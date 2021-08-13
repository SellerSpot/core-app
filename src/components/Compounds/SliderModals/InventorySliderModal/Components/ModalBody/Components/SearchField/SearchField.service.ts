import { ISelectOption } from '@sellerspot/universal-components';
import { ISearchInventoryProductsResponse } from '@sellerspot/universal-types';
import { isEmpty } from 'lodash';
import { requests } from 'requests/requests';

interface ISearchInventoryProps {
    query: string;
}

export class InventoryModalSearchFieldService {
    static convertSearchResultToISelect = (
        items: ISearchInventoryProductsResponse['data']['products'],
    ): ISelectOption[] => {
        const { catalogueProducts, inventoryProducts } = items;
        let options: ISelectOption[] = [];
        if (!isEmpty(inventoryProducts)) {
            const inventoryOptions: ISelectOption[] = inventoryProducts.map((inventoryItem) => {
                return {
                    label: inventoryItem.name,
                    value: inventoryItem.id,
                };
            });
            options = options.concat(inventoryOptions);
        }
        if (!isEmpty(catalogueProducts)) {
            const catalogueProductsOptions: ISelectOption[] = catalogueProducts.map(
                (catalogueProductItem) => {
                    return {
                        label: `Add product "${catalogueProductItem.name}" to inventory`,
                        value: catalogueProductItem.id,
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
