import { ISelectOption } from '@sellerspot/universal-components';
import { requests } from 'requests/requests';
import { IInventoryData } from '@sellerspot/universal-types';

interface ISearchInventoryProps {
    query: string;
}

export class InventoryModalSearchFieldService {
    private static convertSearchResultToISelect = (
        inventoryItems: IInventoryData[],
    ): ISelectOption[] => {
        console.log(inventoryItems);
        // return inventoryItems.map((inventoryItem) => {
        //     return {
        //         label: inventoryItem.product.name,
        //         value: inventoryItem.product.reference.id,
        //     };
        // });
        return [];
    };

    static searchInventory = async (props: ISearchInventoryProps): Promise<ISelectOption[]> => {
        // props
        const { query } = props;
        // request
        const { data, status } = await requests.pos.inventoryRequest.searchProduct(query);
        if (status) {
            if (data.length > 0) {
                return InventoryModalSearchFieldService.convertSearchResultToISelect(data);
            } else {
                return [];
            }
        }
        // compute
        return [];
    };
}
