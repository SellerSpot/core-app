import { IconifyIcon } from '@iconify/react';

export interface IPluginCardProps {
    installed: boolean;
    imageUrl: string;
    pluginName: string;
    pluginIcon: IconifyIcon['icon'];
    pluginDescription: string;
    /**
     * Callback for the install or launch action
     */
    pluginPrimaryCallback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * Callback for the explore action
     */
    pluginSecondaryCallback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
