import { ICONS } from 'utilities/utilities';

export interface IPlugin {
    id: string;
    name: string;
    description: string;
    image: string;
    iconName: keyof typeof ICONS;
}
