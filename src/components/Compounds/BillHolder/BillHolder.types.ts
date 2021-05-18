import { IBill90MMProps } from '../Bill90MM/Bill90MM';

export interface IBillHolderProps {
    billProps: IBill90MMProps;
    billType: '90MM' | 'A4';
}
