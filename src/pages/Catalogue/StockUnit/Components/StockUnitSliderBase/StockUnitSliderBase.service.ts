import { IStockUnitSliderForm } from 'components/Compounds/SliderModals/StockUnitSlider/StockUnitSlider.types';
import { ICreateStockUnitRequest, IStockUnitData } from '@sellerspot/universal-types';
import { requests } from 'requests/requests';

export class StockUnitSliderBaseService {
    static createNewStockUnit = async (values: IStockUnitSliderForm): Promise<IStockUnitData> => {
        const { name } = values;
        const requestData: ICreateStockUnitRequest = {
            name,
        };
        const { data, status } = await requests.catalogue.stockUnitRequest.createNewStockUnit(
            requestData,
        );
        if (status) {
            return data;
        }
        return null;
    };

    static editStockUnit = async (props: { name: string; id: string }): Promise<IStockUnitData> => {
        const { name, id } = props;
        const { data, status } = await requests.catalogue.stockUnitRequest.editStockUnit({
            name,
            id,
        });
        if (status) {
            return data;
        }
        return null;
    };
}
