import { ISearchInventorySelectMeta } from 'components/Compounds/SliderModals/InventorySliderModal/InventorySliderModal';
import { isEmpty } from 'lodash';
import { requests } from 'requests/requests';
import { ISelectOption } from '@sellerspot/universal-components';
import { ISearchInventoryProductsResponse } from '@sellerspot/universal-types';

interface ISearchInventoryProps {
    query: string;
}

export class InventoryModalSearchFieldService {
    static convertSearchResultToISelect = (
        items: ISearchInventoryProductsResponse['data'],
    ): ISelectOption<ISearchInventorySelectMeta>[] => {
        const { catalogue, inventory } = items;
        let options: ISelectOption<ISearchInventorySelectMeta>[] = [];
        // adding products from inventory first
        if (!isEmpty(inventory)) {
            const inventoryOptions = inventory.map<ISelectOption<ISearchInventorySelectMeta>>(
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
        if (!isEmpty(catalogue)) {
            const catalogueProductsOptions = catalogue.map<
                ISelectOption<ISearchInventorySelectMeta>
            >((catalogueItem) => {
                return {
                    label: `Add product "${catalogueItem.name}" to inventory`,
                    value: catalogueItem.id,
                    meta: {
                        type: 'catalogueProduct',
                    },
                };
            });
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
        const { status, data } = await requests.pos.inventoryRequest.searchProduct({
            searchQuery: query,
        });
        if (status) {
            return data;
        }
        // compute
        return {
            inventory: [],
            catalogue: [],
        };
    };
}
