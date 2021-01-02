import { cx } from '@emotion/css';
import React, { ReactElement } from 'react';
import { getSectionTitleStyles } from './sectiontitle.styles';

export interface ISectionTitleProps {
    title: string | ReactElement;
    className?: string;
    style?: React.CSSProperties;
}

export const SectionTitle = (props: ISectionTitleProps): ReactElement => {
    const styles = getSectionTitleStyles();
    return (
        <div className={cx(styles.sectionTitleWrapper, props.className)} style={props.style}>
            {props.title}
        </div>
    );
};
