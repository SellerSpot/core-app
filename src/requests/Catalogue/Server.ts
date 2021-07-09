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
    ICreateTaxGroupRequest,
    ICreateTaxGroupResponse,
    IEditBrandRequest,
    IEditBrandResponse,
    IEditStockUnitRequest,
    IEditStockUnitResponse,
    IEditTaxBracketRequest,
    IEditTaxBracketResponse,
    IEditTaxGroupRequest,
    IEditTaxGroupResponse,
    IGetAllBrandResponse,
    IGetAllStockUnitResponse,
    IGetAllTaxBracketResponse,
    IGetAllTaxGroupResponse,
    IResponse,
    ISearchTaxBracketResponse,
    IStockUnitData,
    ITaxBracketData,
    ITaxGroupData,
} from '@sellerspot/universal-types';

// support types
export interface IProductData {
    name: string;
    barcode: string;
    brand: IBrandData;
    category: ICategoryData;
}

interface ITaxBracketServerData {
    id: string;
    name: string;
    rate?: number;
    bracket?: string[];
}

// db interface
interface ICatalogueServerDBState {
    brands: IBrandData[];
    categories: ICategoryData[];
    taxBrackets: ITaxBracketServerData[];
    stockUnits: IStockUnitData[];
    products: IProductData[];
}
// server interface
interface ICatalogueServer {
    // brand methods
    getAllBrand: () => Promise<IGetAllBrandResponse>;
    createNewBrand: (data: ICreateBrandRequest) => Promise<ICreateBrandResponse>;
    deleteBrand: (id: string) => Promise<IResponse>;
    editBrand: (data: IEditBrandRequest & { id: string }) => Promise<IEditBrandResponse>;
    // stockUnit methods
    getAllStockUnit: () => Promise<IGetAllStockUnitResponse>;
    createNewStockUnit: (data: ICreateStockUnitRequest) => Promise<ICreateStockUnitResponse>;
    deleteStockUnit: (id: string) => Promise<IResponse>;
    editStockUnit: (
        data: IEditStockUnitRequest & { id: string },
    ) => Promise<IEditStockUnitResponse>;
    // taxBracket
    getAllTaxBracket: () => Promise<IGetAllTaxBracketResponse>;
    searchTaxBracket: (searchQuery: string) => Promise<ISearchTaxBracketResponse>;
    createNewTaxBracket: (data: ICreateTaxBracketRequest) => Promise<ICreateTaxBracketResponse>;
    deleteTaxBracket: (id: string) => Promise<IResponse>;
    editTaxBracket: (
        data: IEditTaxBracketRequest & { id: string },
    ) => Promise<IEditTaxBracketResponse>;
    // taxGroup
    getAllTaxGroup: () => Promise<IGetAllTaxGroupResponse>;
    createNewTaxGroup: (data: ICreateTaxGroupRequest) => Promise<ICreateTaxGroupResponse>;
    deleteTaxGroup: (id: string) => Promise<IResponse>;
    editTaxGroup: (data: IEditTaxGroupRequest & { id: string }) => Promise<IEditTaxGroupResponse>;
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
        await introduceDelay(1000);
        return {
            status: true,
            data: state.brands.value,
        };
    },
    createNewBrand: async (data) => {
        await introduceDelay(1000);
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
        await introduceDelay(1000);
        state.brands.set((state) => {
            const requiredIndex = state.findIndex((brand) => brand.id === id);
            state.splice(requiredIndex, 1);
            return state;
        });
        return {
            data: null,
            status: true,
        };
    },
    editBrand: async (data) => {
        await introduceDelay(1000);
        const { name, id } = data;
        state.brands.set((state) => {
            const requiredIndex = state.findIndex((brand) => brand.id === id);
            state[requiredIndex].name = name;
            return state;
        });
        return {
            data: null,
            status: true,
        };
    },

    // stockUnit
    getAllStockUnit: async () => {
        await introduceDelay(1000);
        return {
            status: true,
            data: state.stockUnits.get(),
        };
    },
    createNewStockUnit: async (data) => {
        await introduceDelay(1000);
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
        await introduceDelay(1000);
        state.stockUnits.set((state) => {
            const requiredIndex = state.findIndex((stockUnit) => stockUnit.id === id);
            state.splice(requiredIndex, 1);
            return state;
        });
        return {
            data: null,
            status: true,
        };
    },
    editStockUnit: async (data) => {
        await introduceDelay(1000);
        const { name, id } = data;
        let updatedData: IStockUnitData = null;
        state.stockUnits.set((state) => {
            const requiredIndex = state.findIndex((stockUnit) => stockUnit.id === id);
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
        await introduceDelay(1000);
        const allTaxBrackets: ITaxBracketData[] = [];
        state.taxBrackets.value.map((bracketData) => {
            if (!bracketData.bracket) {
                allTaxBrackets.push(bracketData as ITaxBracketData);
            }
        });
        return {
            status: true,
            data: allTaxBrackets,
        };
    },
    searchTaxBracket: async (searchQuery: string) => {
        await introduceDelay(1000);
        const allTaxBrackets = state.taxBrackets.get();
        const searchResults: ITaxBracketData[] = [];
        allTaxBrackets.map((bracket) => {
            const { id, name, rate } = bracket;
            if (name.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())) {
                searchResults.push({
                    id,
                    name,
                    rate,
                });
            }
        });
        return {
            status: true,
            data: searchResults,
        };
    },
    createNewTaxBracket: async (data) => {
        await introduceDelay(1000);
        const newTaxBracket: ITaxBracketData = {
            id: generateRandomString(),
            name: data.name,
            rate: data.rate,
        };
        state.taxBrackets.set((state) => {
            state.unshift(newTaxBracket);
            return state;
        });
        return {
            data: newTaxBracket,
            status: true,
        };
    },
    deleteTaxBracket: async (id) => {
        await introduceDelay(1000);
        state.taxBrackets.set((state) => {
            const requiredIndex = state.findIndex((taxBracket) => taxBracket.id === id);
            state.splice(requiredIndex, 1);
            return state;
        });
        return {
            data: null,
            status: true,
        };
    },
    editTaxBracket: async (data) => {
        await introduceDelay(1000);
        const { name, id, rate } = data;
        let updatedData: ITaxBracketData = null;
        state.taxBrackets.set((state) => {
            const requiredIndex = state.findIndex((taxBracket) => taxBracket.id === id);
            state[requiredIndex].name = name;
            state[requiredIndex].rate = rate;
            updatedData = state[requiredIndex] as ITaxBracketData;
            return state;
        });
        return {
            data: updatedData,
            status: true,
        };
    },

    // taxGroup
    getAllTaxGroup: async () => {
        await introduceDelay(1000);
        // stores data to return as response
        const allTaxGroups: ITaxGroupData[] = [];
        // iterating through all tax brackets
        state.taxBrackets.value.map((bracketData) => {
            // selecting brackets which are groups
            if (bracketData.bracket) {
                // to store total rate of taxGroup
                let totalRate = 0;
                // getting instances of all subBrackets of this group
                const subBrackets = bracketData.bracket.map((subBracketId) => {
                    return state.taxBrackets
                        .find((bracket) => bracket.id.value === subBracketId)
                        .get();
                });
                // computing the totalRate of this group
                subBrackets.map((subBracket) => {
                    const { rate } = subBracket;
                    totalRate += rate;
                });
                // compiling data
                const taxGroup: ITaxGroupData = {
                    id: bracketData.id,
                    name: bracketData.name,
                    bracket: subBrackets as ITaxBracketData[],
                    rate: totalRate,
                };
                allTaxGroups.push(taxGroup);
            }
        });
        return {
            status: true,
            data: allTaxGroups,
        };
    },
    createNewTaxGroup: async (data) => {
        await introduceDelay(1000);
        // holds the to-be-created taxGroup data
        const newTaxGroup: ITaxBracketServerData = {
            id: generateRandomString(),
            name: data.name,
            bracket: data.bracket,
        };
        // getting instances of all subBrackets of this group
        const subBrackets = data.bracket.map((subBracketId) => {
            return state.taxBrackets.find((bracket) => bracket.id.value === subBracketId).get();
        });
        // to store total rate of taxGroup
        let totalRate = 0;
        // computing the totalRate of this group
        subBrackets.map((subBracket) => {
            const { rate } = subBracket;
            totalRate += rate;
        });
        // value to return
        const newTaxGroupReturnValue: ITaxGroupData = {
            id: newTaxGroup.id,
            name: data.name,
            bracket: subBrackets as ITaxBracketData[],
            rate: totalRate,
        };
        state.taxBrackets.set((state) => {
            state.unshift(newTaxGroup);
            return state;
        });
        return {
            data: newTaxGroupReturnValue,
            status: true,
        };
    },
    deleteTaxGroup: async (id) => {
        await introduceDelay(1000);
        state.taxBrackets.set((state) => {
            const requiredIndex = state.findIndex((taxBracket) => taxBracket.id === id);
            state.splice(requiredIndex, 1);
            return state;
        });
        return {
            data: null,
            status: true,
        };
    },
    editTaxGroup: async (data) => {
        await introduceDelay(1000);
        const { name, id, bracket } = data;
        let updatedData: ITaxGroupData = null;
        state.taxBrackets.set((state) => {
            const requiredIndex = state.findIndex((taxBracket) => taxBracket.id === id);
            state[requiredIndex].name = name;
            state[requiredIndex].bracket = bracket;
            // getting instances of all subBrackets of this group
            const subBrackets = data.bracket.map((subBracketId) => {
                return state.find((bracket) => bracket.id === subBracketId);
            });
            // to store total rate of taxGroup
            let totalRate = 0;
            // computing the totalRate of this group
            subBrackets.map((subBracket) => {
                const { rate } = subBracket;
                totalRate += rate;
            });
            updatedData = {
                id: state[requiredIndex].id,
                name,
                rate: totalRate,
                bracket: subBrackets as ITaxBracketData[],
            };
            return state;
        });
        return {
            data: updatedData,
            status: true,
        };
    },
});

export const accessCatalogueServer = (): ICatalogueServer => catalogueServer(catalogueDBState);
