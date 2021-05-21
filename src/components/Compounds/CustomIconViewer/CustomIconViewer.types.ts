import { CSSProperties } from 'react';
import * as icons from '../../../assets/customIcons/customIcons';

export interface ICustomIconViewerProps {
    color: CSSProperties['color'];
    size: CSSProperties['height'];
    icon: keyof typeof icons;
}
