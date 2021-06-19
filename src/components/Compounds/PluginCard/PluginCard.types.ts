import { IconifyIcon } from '@iconify/react';
import { TOnNodeClickHandler } from '@sellerspot/universal-components/dist';

export interface IPluginCardProps {
    isInstalled: boolean;
    image: string;
    name: string;
    icon: IconifyIcon['icon'];
    description: string;
    /**
     * Callback for the install or launch action
     */
    installOrLaunchCallBack: TOnNodeClickHandler<HTMLButtonElement>;
    /**
     * Callback for the explore action
     */
    exploreCallBack: TOnNodeClickHandler<HTMLDivElement | HTMLButtonElement>;
}
