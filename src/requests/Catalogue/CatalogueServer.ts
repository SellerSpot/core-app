import { createState, State } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { generateRandomString, introduceDelay } from '@sellerspot/universal-components';
import {
    IBrandData,
    ICategoryData,
    ICreateBrandRequest,
    ICreateBrandResponse,
    IDeleteBrandResponse,
    IEditBrandRequest,
    IEditBrandResponse,
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
    getAllBrand: () => Promise<IGetAllBrandResponse>;
    createNewBrand: (data: ICreateBrandRequest) => Promise<ICreateBrandResponse>;
    deleteBrand: (id: string) => Promise<IDeleteBrandResponse>;
    editBrand: (data: IEditBrandRequest) => Promise<IEditBrandResponse>;
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
    getAllBrand: async () => {
        await introduceDelay(2000);
        return {
            status: true,
            data: state.brands.value,
        };
    },
    createNewBrand: async (data) => {
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
    deleteBrand: async (id) => {
        await introduceDelay(2000);
        let dataToDelete: IBrandData = null;
        state.brands.set((state) => {
            const requiredIndex = state.findIndex((brand) => brand.id === id);
            dataToDelete = state[requiredIndex];
            state.splice(requiredIndex, 1);
            console.log(state);
            return state;
        });
        return {
            data: dataToDelete,
            status: true,
        };
    },
    editBrand: async (data) => {
        await introduceDelay(2000);
        const { name, id } = data;
        let updatedData: IBrandData = null;
        state.brands.set((state) => {
            const requiredIndex = state.findIndex((brand) => brand.id === id);
            state[requiredIndex].name = name;
            updatedData = state[requiredIndex];
            return state;
        });
        return {
            data: updatedData,
            status: true,
        };
    },
});

export const accessCatalogueServer = (): ICatalogueServer => catalogueServer(catalogueDBState);
