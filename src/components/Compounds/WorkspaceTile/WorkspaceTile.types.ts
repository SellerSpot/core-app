import { ReactElement } from 'react';

export interface IWorkspaceTileProps {
    /**
     * Custom css class for the component
     */
    className?: {
        wrapper?: string;
    };
    /**
     * Custom inline styling for the component
     */
    style?: {
        wrapper?: React.CSSProperties;
    };
    /**
     * The workspace icon to show
     * @default HomeWorkspaceIcon
     */
    workspaceIcon?: ReactElement;
    /**
     * Toggles the tile to expanded state
     * @default false
     */
    expanded?: boolean;
    /**
     * Toggles the tile to selected state
     * @default false
     */
    selected?: boolean;
}
