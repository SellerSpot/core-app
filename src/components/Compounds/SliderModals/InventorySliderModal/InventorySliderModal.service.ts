import {
    IAddProductToInventoryRequest,
    IAddProductToInventoryResponse,
    IEditProductInInventoryRequest,
    IEditProductInInventoryResponse,
    IInventoryData,
    IOutletData,
    ITaxBracketData,
} from '@sellerspot/universal-types';
import { FieldsService } from 'components/Compounds/SliderModals/InventorySliderModal/Components/ModalBody/Components/ExpandingPanels/Components/DetailsContentView/Components/Fields.service';
import { InventoryService } from 'pages/PointOfSale/Inventory/Inventory.service';
import { requests } from 'requests/requests';
import { ICONS } from 'utilities/utilities';
import {
    IInventorySliderModalDynamicValues,
    IInventorySliderModalForm,
    IInventorySliderModalFormFields,
    IInventorySliderModalProps,
    IInventorySliderModalState,
} from './InventorySliderModal.types';

type IGetDynamicProps = Pick<IInventorySliderModalState, 'mode'>;

interface IAssembleInventorySliderModalData {
    formData: IInventorySliderModalForm;
    inventoryProductOutlets: IInventoryData['outlets'];
    outletsToShow: IOutletData[];
}

type IAssembleInventoryDataForAddingCatalogueProductReturn = IAssembleInventorySliderModalData;

type IAssembleInventoryDataForEditingInventoryProduct = IAssembleInventorySliderModalData;

type IAssembleInventoryDataForEditingInventoryProductWithPrefillData =
    IAssembleInventorySliderModalData;

export class InventorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): IInventorySliderModalDynamicValues => {
        // props
        const { mode } = props;
        let modalTitle = 'Add product to inventory';
        let modalFooterPrimaryButtonLabel = 'ADD PRODUCT TO INVENTORY';
        let modalFooterPrimaryButtonIcon = ICONS.outlineAdd;

        // modalTitle
        if (mode === 'edit') modalTitle = 'Edit product in inventory';

        // modalFooterPrimaryButtonLabel
        if (mode === 'edit') modalFooterPrimaryButtonLabel = 'SAVE CHANGES';

        // modalFooterPrimaryButtonIcon
        if (mode === 'edit') modalFooterPrimaryButtonIcon = ICONS.check;

        // return
        return {
            modalFooterPrimaryButtonIcon,
            modalFooterPrimaryButtonLabel,
            modalTitle,
        };
    };

    static assembleInventoryDataForAddingCatalogueProduct =
        async (): Promise<IAssembleInventoryDataForAddingCatalogueProductReturn> => {
            // getting all outlets
            const allOutlets = await InventoryService.getAllOutlets();
            // outlets to render
            const outletsToShow: IOutletData[] = [];
            // holds the data to initialize the form with
            const formData: IInventorySliderModalForm = {};
            // holds the outlets data to set to currentProduct
            const inventoryProductOutlets: IInventoryData['outlets'] = {};
            // creating form values for all outlets
            allOutlets.map((outlet) => {
                const autoFillValues: IInventorySliderModalFormFields = {
                    landingCost: 0,
                    markup: 0,
                    mrp: 0,
                    sellingPrice: 0,
                    stock: 0,
                    isActive: false,
                    isTrack: false,
                    taxBracket: null,
                };
                formData[outlet.id] = {
                    ...autoFillValues,
                };
                inventoryProductOutlets[outlet.id] = {
                    ...autoFillValues,
                    outlet,
                    taxBracket: null,
                };
                outletsToShow.push(outlet);
            });
            return { formData, inventoryProductOutlets, outletsToShow };
        };

    /**
     * Used to assemble Inventory Data when an already present inventory item is to be shown
     */
    static assembleInventoryDataForEditingInventoryProduct = async (
        productId: string,
    ): Promise<IAssembleInventoryDataForEditingInventoryProduct> => {
        // props to return
        const formData: IInventorySliderModalForm = {};
        const inventoryProductOutlets: IInventoryData['outlets'] = {};
        const outletsToShow: IOutletData[] = [];
        // fetching relevant inventory data
        const response = await requests.pos.inventoryRequest.getInventoryByProductId(productId);
        if (response.status) {
            const inventoryData = response.data;
            const outlets = Object.keys(inventoryData.outlets);
            outlets.map((outletId) => {
                const outletData = inventoryData['outlets'][outletId];
                const prefillValues: IInventorySliderModalFormFields = {
                    landingCost: outletData.landingCost,
                    markup: outletData.markup,
                    mrp: outletData.mrp,
                    sellingPrice: outletData.sellingPrice,
                    stock: outletData.stock,
                    isActive: outletData.isActive,
                    isTrack: outletData.isTrack,
                    taxBracket: FieldsService.convertITaxBracketDataToISelect(
                        outletData.taxBracket as ITaxBracketData,
                    ),
                };
                formData[outletId] = {
                    ...prefillValues,
                };
                inventoryProductOutlets[(outletData.outlet as IOutletData).id] = {
                    ...prefillValues,
                    outlet: outletData.outlet,
                    taxBracket: null,
                };
                outletsToShow.push(outletData.outlet as IOutletData);
            });
        }

        return {
            formData,
            inventoryProductOutlets,
            outletsToShow,
        };
    };

    /**
     * Used to assemble Inventory Data when it is passed as Prefill data
     */
    static assembleInventoryDataForEditingInventoryProductWithPrefillData = (
        prefillData: IInventorySliderModalProps['prefillData'],
    ): IAssembleInventoryDataForEditingInventoryProductWithPrefillData => {
        // props to return
        const formData: IInventorySliderModalForm = {};
        const inventoryProductOutlets: IInventoryData['outlets'] = {};
        const outletsToShow: IOutletData[] = [];
        // fetching relevant inventory data
        const inventoryData = prefillData.product;
        const outlets = Object.keys(inventoryData.outlets);
        outlets.map((outletId) => {
            const outletData = inventoryData['outlets'][outletId];
            const prefillValues: IInventorySliderModalFormFields = {
                landingCost: outletData.landingCost,
                markup: outletData.markup,
                mrp: outletData.mrp,
                sellingPrice: outletData.sellingPrice,
                stock: outletData.stock,
                isActive: outletData.isActive,
                isTrack: outletData.isTrack,
                taxBracket: FieldsService.convertITaxBracketDataToISelect(
                    outletData.taxBracket as ITaxBracketData,
                ),
            };
            formData[outletId] = {
                ...prefillValues,
            };
            inventoryProductOutlets[(outletData.outlet as IOutletData).id] = {
                ...prefillValues,
                outlet: outletData.outlet,
                taxBracket: null,
            };
            outletsToShow.push(outletData.outlet as IOutletData);
        });

        return {
            formData,
            inventoryProductOutlets,
            outletsToShow,
        };
    };

    /**
     * Used to add a product to inventory
     */
    static addProductToInventory = async (
        props: IAddProductToInventoryRequest,
    ): Promise<IAddProductToInventoryResponse['data']> => {
        const { data, status } = await requests.pos.inventoryRequest.addProductToInventory(props);
        return status ? data : null;
    };

    /**
     * Used to edit a product in inventory
     */
    static editProductInInventory = async (
        props: IEditProductInInventoryRequest,
    ): Promise<IEditProductInInventoryResponse['data']> => {
        const { data, status } = await requests.pos.inventoryRequest.editProductInInventory(props);
        return status ? data : null;
    };
}
