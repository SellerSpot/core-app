import { css } from '@emotion/css';
import { ISpaceProps } from './Space';

export const getSpaceStyles = (props: ISpaceProps): { spaceWrapper: string } => {
    const spaceWrapper = css`
        display: block;
        width: ${props.orientation === 'vertical' ? 0 : props.size}px;
        height: ${props.orientation === 'vertical' ? props.size : 0}px;
    `;

    return {
        spaceWrapper,
    };
};
