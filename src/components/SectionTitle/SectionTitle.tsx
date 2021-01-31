import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import styles from './sectiontitle.module.scss';

export interface ISectionTitleProps {
    title: string | ReactElement;
    className?: string;
    style?: React.CSSProperties;
}

export const SectionTitle = (props: ISectionTitleProps): ReactElement => {
    return (
        <div className={cx(styles.sectionTitleWrapper, props.className)} style={props.style}>
            {props.title}
        </div>
    );
};
