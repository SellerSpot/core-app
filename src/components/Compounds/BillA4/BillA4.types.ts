import {
    IBillBaseChildProps,
    IBillBaseProps,
} from 'pages/PointOfSale/BillSettings/BillSettings.types';
import { IBillA4Settings } from '@sellerspot/universal-types';

export type IBillA4Props = IBillBaseProps<IBillA4Settings>;

export type IBillA4ChildProps = IBillBaseChildProps<IBillA4Settings>;
