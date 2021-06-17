import { createState, State } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { generateRandomString, introduceDelay } from '@sellerspot/universal-components';
import {
    IBrandData,
    ICategoryData,
    ICreateBrandRequest,
    ICreateBrandResponse,
    IGetAllBrandResponse,
    ITaxBracketData,
} from '@sellerspot/universal-types';

// support types
export interface IStockUnitData {
    id: string;
    unit: string;
}
export interface IProductData {
    name: string;
    barcode: string;
    brand: IBrandData;
    category: ICategoryData;
}

// db interface
interface ICatalogueServerDBState {
    brands: IBrandData[];
    categories: ICategoryData[];
    taxBrackets: ITaxBracketData[];
    stockUnits: IStockUnitData[];
    products: IProductData[];
}
// server interface
interface ICatalogueServer {
    getAllBrands: () => Promise<IGetAllBrandResponse>;
    createNewBrand: (value: ICreateBrandRequest) => Promise<ICreateBrandResponse>;
}

// db state
const catalogueDBState = createState<ICatalogueServerDBState>({
    brands: [],
    categories: [],
    products: [],
    stockUnits: [],
    taxBrackets: [],
});

// attaching persistence
catalogueDBState.attach(Persistence('catalogueDB'));

// server
const catalogueServer = (state: State<Partial<ICatalogueServerDBState>>): ICatalogueServer => ({
    getAllBrands: async (): Promise<IGetAllBrandResponse> => {
        await introduceDelay(2000);
        return {
            status: true,
            data: state.brands.value,
        };
    },
    createNewBrand: async (data: ICreateBrandRequest): Promise<ICreateBrandResponse> => {
        await introduceDelay(2000);
        const newBrand: IBrandData = {
            id: generateRandomString(),
            name: data.name,
        };
        state.brands.set((state) => {
            state.unshift(newBrand);
            return state;
        });
        return {
            data: newBrand,
            status: true,
        };
    },
});

export const accessCatalogueServer = (): ICatalogueServer => catalogueServer(catalogueDBState);
