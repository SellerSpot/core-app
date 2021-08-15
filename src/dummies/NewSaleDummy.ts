import { IInventoryData } from '@sellerspot/universal-types';

export default class NewSaleDummy {
    static DEFAULT_OUTLET_ID = 'bWFpbm91dGxldA==';

    static getInventoryProducts(): IInventoryData[] {
        return [
            {
                id: 'c29tZXJhbmRvbWlk',
                name: 'Tomato',
                barcode: 'c29tZXJhbmRvbWlk',
                outlets: {
                    [NewSaleDummy.DEFAULT_OUTLET_ID]: {
                        isActive: true,
                        isTrack: true,
                        landingCost: 10,
                        markup: 50,
                        mrp: 20,
                        outlet: {
                            id: NewSaleDummy.DEFAULT_OUTLET_ID,
                            address: 'Outlet address',
                            name: 'Main Outlet',
                        },
                        sellingPrice: 15,
                        stock: 20,
                        taxBracket: {
                            id: 'R1NU',
                            name: 'GST',
                            rate: 18,
                        },
                    },
                },
                brand: {
                    id: 'bmV3YnJhbmQ=',
                    name: 'New brand',
                },
                category: {
                    id: 'asdfasdf',
                    title: 'New Category',
                },
                description: 'No description',
                stockUnit: {
                    id: 'bmV3c3RvY2t1bml0',
                    name: 'Kilogram (s)',
                    unit: 'kg',
                    isDefault: true,
                },
            },
        ];
    }
}
