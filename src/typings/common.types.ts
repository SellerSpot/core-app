import { ReactElement } from 'react';

export type TPrimitiveType = string | number;

// Infering types from Route object with autocomplete support.
//const inferRouteTypes = <T extends { [key: string]: string }>(arg: T): T => arg;

/**
 * Common typings for events for components
 */
export interface IComponentEvents {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    oneMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface IOnClickEvents {
    div: React.MouseEvent<HTMLDivElement, MouseEvent>;
    button: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export type TReactChildren = ReactElement | ReactElement[] | string | number;

export type TObject<T = string | number> = { [k: string]: T };

export interface ISelectOption<T = string> {
    label: string;
    value: T;
}
