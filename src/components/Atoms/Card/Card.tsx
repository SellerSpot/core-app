import { Card as MUICard, CardActions, CardContent, CardMedia } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { ICardProps } from './Card.types';

export default function Card(props: ICardProps): ReactElement {
    return (
        <MUICard onClick={props.onClickCard} className={props.className?.cardWrapper}>
            <CardMedia className={props.className?.mediaWrapper}>{props.media}</CardMedia>
            <CardContent className={props.className?.contentWrapper}>{props.content}</CardContent>
            <CardActions className={props.className?.actionsWrapper}>{props.actions}</CardActions>
        </MUICard>
    );
}
