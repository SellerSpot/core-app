import { createState, State } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { generateRandomString, introduceDelay } from '@sellerspot/universal-components';
import {
    IBrandData,
    ICategoryData,
    ICreateBrandRequest,
    ICreateBrandResponse,
    ICreateStockUnitRequest,
    ICreateStockUnitResponse,
    ICreateTaxBracketRequest,
    ICreateTaxBracketResponse,
    IDeleteBrandResponse,
    IDeleteStockUnitResponse,
    IDeleteTaxBracketResponse,
    IEditBrandRequest,
    IEditBrandResponse,
    IEditStockUnitRequest,
    IEditStockUnitResponse,
    IEditTaxBracketRequest,
    IEditTaxBracketResponse,
    IGetAllBrandResponse,
    IGetAllStockUnitResponse,
    IGetAllTaxBracketResponse,
    IStockUnitData,
    ITaxBracketData,
} from '@sellerspot/universal-types';

// support types
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
    // brand methods
    getAllBrand: () => Promise<IGetAllBrandResponse>;
    createNewBrand: (data: ICreateBrandRequest) => Promise<ICreateBrandResponse>;
    deleteBrand: (id: string) => Promise<IDeleteBrandResponse>;
    editBrand: (data: IEditBrandRequest & { id: string }) => Promise<IEditBrandResponse>;
    // stockUnit methods
    getAllStockUnit: () => Promise<IGetAllStockUnitResponse>;
    createNewStockUnit: (data: ICreateStockUnitRequest) => Promise<ICreateStockUnitResponse>;
    deleteStockUnit: (id: string) => Promise<IDeleteStockUnitResponse>;
    editStockUnit: (
        data: IEditStockUnitRequest & { id: string },
    ) => Promise<IEditStockUnitResponse>;
    // taxBracket
    getAllTaxBracket: () => Promise<IGetAllTaxBracketResponse>;
    createNewTaxBracket: (data: ICreateTaxBracketRequest) => Promise<ICreateTaxBracketResponse>;
    deleteTaxBracket: (id: string) => Promise<IDeleteTaxBracketResponse>;
    editTaxBracket: (
        data: IEditTaxBracketRequest & { id: string },
    ) => Promise<IEditTaxBracketResponse>;
}

// db state
const catalogueDBState = createState<ICatalogueServerDBState>({
    brands: [],
    categories: [],
    products: [],
    stockUnits: [
        {
            id: generateRandomString(),
            name: 'kg',
            isDefault: true,
        },
        {
            id: generateRandomString(),
            name: 'mg',
            isDefault: true,
        },
        {
            id: generateRandomString(),
            name: 'g',
            isDefault: true,
        },
    ],
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

    // stockUnit
    getAllStockUnit: async () => {
        await introduceDelay(2000);
        return {
            status: true,
            data: state.stockUnits.get(),
        };
    },
    createNewStockUnit: async (data) => {
        await introduceDelay(2000);
        const newStockUnit: IStockUnitData = {
            id: generateRandomString(),
            name: data.name,
            isDefault: false,
        };
        state.stockUnits.set((state) => {
            state.unshift(newStockUnit);
            return state;
        });
        return {
            data: newStockUnit,
            status: true,
        };
    },
    deleteStockUnit: async (id) => {
        await introduceDelay(2000);
        let dataToDelete: IStockUnitData = null;
        state.stockUnits.set((state) => {
            const requiredIndex = state.findIndex((stockUnit) => stockUnit.id === id);
            dataToDelete = state[requiredIndex];
            state.splice(requiredIndex, 1);
            return state;
        });
        return {
            data: dataToDelete,
            status: true,
        };
    },
    editStockUnit: async (data) => {
        await introduceDelay(2000);
        const { name, id } = data;
        let updatedData: IStockUnitData = null;
        state.stockUnits.set((state) => {
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

    // taxBracket
    getAllTaxBracket: async () => {
        await introduceDelay(2000);
        return {
            status: true,
            data: state.taxBrackets.value,
        };
    },
    createNewTaxBracket: async (data) => {
        await introduceDelay(2000);
        const newTaxBracket: ITaxBracketData = {
            id: generateRandomString(),
            name: data.name,
            rate: data.rate,
        };
        state.brands.set((state) => {
            state.unshift(newTaxBracket);
            return state;
        });
        return {
            data: newTaxBracket,
            status: true,
        };
    },
    deleteTaxBracket: async (id) => {
        await introduceDelay(2000);
        let dataToDelete: ITaxBracketData = null;
        state.taxBrackets.set((state) => {
            const requiredIndex = state.findIndex((brand) => brand.id === id);
            dataToDelete = state[requiredIndex];
            state.splice(requiredIndex, 1);
            return state;
        });
        return {
            data: dataToDelete,
            status: true,
        };
    },
    editTaxBracket: async (data) => {
        await introduceDelay(2000);
        const { name, id } = data;
        let updatedData: ITaxBracketData = null;
        state.taxBrackets.set((state) => {
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
