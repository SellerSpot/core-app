import { MouseEvent, FocusEvent } from 'react';

export type TPrimitiveType = string | number;

const inferRouteTypes = <T extends { [key: string]: string }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.

/**
 * Common typings for events for components
 */
export interface IComponentEvents {
    onClick?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
    oneMouseOver?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
