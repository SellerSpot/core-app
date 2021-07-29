import { IBill90MMSettings, IBillData } from 'pages/PointOfSale/BillSettings/BillSettings.types';
export interface IBill90MMProps {
    settings: IBill90MMSettings;
    data: IBillData;
}

export interface IBill90MMChildProps {
    data: IBillData;
    settings: IBill90MMSettings;
}
