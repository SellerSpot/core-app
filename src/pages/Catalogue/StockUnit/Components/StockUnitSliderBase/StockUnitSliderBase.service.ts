import { IStockUnitData } from '@sellerspot/universal-types';
import { IStockUnitSliderForm } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';
import { requests } from 'requests/requests';

type ICreateNewStockUnitProps = IStockUnitSliderForm;

interface IEditStockUnitProps {
    name: string;
    id: string;
}

export class StockUnitSliderBaseService {
    static createNewStockUnit = async (
        props: ICreateNewStockUnitProps,
    ): Promise<IStockUnitData> => {
        // props
        const { name } = props;

        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.createNewStockUnit({
            name,
        });

        // process
        if (status) {
            return data;
        }
        return null;
    };

    static editStockUnit = async (props: IEditStockUnitProps): Promise<IStockUnitData> => {
        // props
        const { name, id } = props;

        // request
        const { data, status } = await requests.catalogue.stockUnitRequest.editStockUnit({
            name,
            id,
        });

        // process
        if (status) {
            return data;
        }
        return null;
    };
}
