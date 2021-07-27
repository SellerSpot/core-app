import { IStockUnitData } from '@sellerspot/universal-types';
import { IStockUnitSliderForm } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';
import { requests } from 'requests/requests';

type ICreateNewStockUnitProps = IStockUnitSliderForm;

type IEditStockUnitProps = Pick<IStockUnitData, 'id' | 'name' | 'unit'>;

export class StockUnitSliderBaseService {
    static createNewStockUnit = async (
        props: ICreateNewStockUnitProps,
    ): Promise<IStockUnitData> => {
        // props
        const { name, unit } = props;

        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.createNewStockUnit({
            name,
            unit,
        });

        // process
        if (status) {
            return data;
        }
        return null;
    };

    static editStockUnit = async (props: IEditStockUnitProps): Promise<IStockUnitData> => {
        // props
        const { name, id, unit } = props;

        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.editStockUnit({
            name,
            id,
            unit,
        });

        // process
        if (status) {
            return data;
        }
        return null;
    };
}
