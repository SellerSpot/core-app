import { IconifyIcon } from '@iconify/react';

export interface IPluginCardProps {
    isInstalled: boolean;
    image: string;
    name: string;
    icon: IconifyIcon['icon'];
    description: string;
    /**
     * Callback for the install or launch action
     */
    installOrLaunchCallBack: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * Callback for the explore action
     */
    exploreCallBack: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
