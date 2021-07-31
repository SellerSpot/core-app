import {
    IBillBaseChildProps,
    IBillBaseProps,
} from 'pages/PointOfSale/BillSettings/BillSettings.types';
import { IBill90MMSettings } from '@sellerspot/universal-types';

export type IBill90MMProps = IBillBaseProps<IBill90MMSettings>;

export type IBill90MMChildProps = IBillBaseChildProps<IBill90MMSettings>;
