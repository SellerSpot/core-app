import { ReactElement } from 'react';

export interface IAvatarProps {
    /**
     * Custom css class for the component
     */
    className?: string;
    /**
     * Custom inline styling for the component
     */
    style?: React.CSSProperties;
    /**
     * The content to show if there is no image to render
     * @default SellerSpot(string)
     */
    content: ReactElement | string;
    /**
     * Image URL to fetch for avatar
     */
    imgSrc?: string;
    /**
     * Shape varient for the avatar
     * @default rounded
     */
    varient?: 'circle' | 'square' | 'rounded';
    /**
     * Theme for the component
     * @default unselected
     */
    theme?: 'selected' | 'unselected' | 'selectedNoBg';
}
