import { createState, State } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { introduceDelay } from '@sellerspot/universal-components';
import { IBrandData, ICategoryData, ITaxBracketData } from '@sellerspot/universal-types';

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
    getAllBrands: () => Promise<IBrandData[]>;
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
    getAllBrands: async (): Promise<IBrandData[]> => {
        await introduceDelay(4000);
        return state.brands.value;
    },
});

export const accessCatalogueServer = (): ICatalogueServer => catalogueServer(catalogueDBState);
