import { IBillA4Settings, IBillData } from 'pages/PointOfSale/BillSettings/BillSettings.types';

export interface IBillA4Props {
    data: IBillData;
    settings: IBillA4Settings;
}

export interface IBillA4ChildProps {
    data: IBillData;
    settings: IBillA4Settings;
}
