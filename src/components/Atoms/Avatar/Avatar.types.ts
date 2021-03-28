import { ReactElement } from 'react';

export interface IAvatarProps {
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
