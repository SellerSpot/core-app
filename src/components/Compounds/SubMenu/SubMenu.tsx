import cn from 'classnames';
import { TRouteKeys } from 'config/routes';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routeSelector } from 'store/models/route';
import SubMenuTile from '../SubMenuTile/SubMenuTile';
import styles from './SubMenu.module.scss';
import { ISubMenuProps } from './SubMenu.types';

const ChildTile = (props: {
    childTiles: ISubMenuProps['tiles'][0]['childTiles'];
    childTilesVisible: boolean;
}) => {
    const { childTiles, childTilesVisible } = props;
    const history = useHistory();
    const { routeKeys } = useSelector(routeSelector);
    return (
        <>
            {childTiles?.map((childTile, childTileIndex) => {
                const { disabled, redirectRoute, routeKey, title } = childTile;
                const childTileOnClickHander = () => {
                    history.push(redirectRoute);
                };
                return (
                    <div
                        key={childTileIndex}
                        className={cn(styles.childTiles, {
                            [styles.childTileShow]: childTilesVisible,
                            [styles.childTileHide]: !childTilesVisible,
                        })}
                    >
                        <SubMenuTile
                            title={title}
                            disabled={disabled}
                            selected={routeKeys.includes(routeKey)}
                            events={{
                                onClick: childTileOnClickHander,
                            }}
                            miniTile
                        />
                    </div>
                );
            })}
        </>
    );
};

const checkIfChildTilesShouldBeVisible = (props: {
    childTiles: ISubMenuProps['tiles'][0]['childTiles'];
    routeKeys: TRouteKeys[];
}) => {
    const { childTiles, routeKeys } = props;
    let shouldBeVisible = false;
    if (!!childTiles) {
        Object.values(childTiles).map((childTile) => {
            if (routeKeys.includes(childTile.routeKey)) {
                shouldBeVisible = true;
            }
        });
    }

    return shouldBeVisible;
};

const Tile = (props: { tile: ISubMenuProps['tiles'][0] }) => {
    // props
    const { tile } = props;
    const { disabled, icon, redirectRoute, routeKey, title, childTiles } = tile;

    // hooks
    const { routeKeys } = useSelector(routeSelector);
    const history = useHistory();

    // compute
    const shouldChildTilesBeVisible = checkIfChildTilesShouldBeVisible({
        childTiles,
        routeKeys,
    });
    // console.log(routeKeys, shouldChildTilesBeVisible, title);

    // state
    const [childTilesVisible, setChildTilesVisible] = useState(shouldChildTilesBeVisible);

    // handlers
    const tileOnClickHander = () => {
        // checking if children exists for this tile
        if (childTiles?.length > 0) {
            setChildTilesVisible(!childTilesVisible);
        } else {
            history.push(redirectRoute);
        }
    };

    // classNames
    const childTileWrapperClassName = cn(styles.childTilesWrapper, {
        [styles.childTilesWrapperShow]: childTilesVisible,
    });

    return (
        <div className={styles.tileGroup}>
            <SubMenuTile
                childTilesVisible={childTilesVisible ?? false}
                title={title}
                disabled={disabled}
                selected={routeKeys.includes(routeKey)}
                miniTile={false}
                icon={icon}
                showTailIcon={childTiles?.length > 0}
                events={{
                    onClick: tileOnClickHander,
                }}
            />
            <div className={childTileWrapperClassName}>
                <ChildTile childTiles={childTiles} childTilesVisible={childTilesVisible} />
            </div>
        </div>
    );
};

export const SubMenu = (props: ISubMenuProps): ReactElement => {
    // props
    const { tiles } = props;
    // state
    const [tilesState] = useState(tiles);

    return (
        <div className={styles.wrapper}>
            <div className={styles.upperTiles}>
                {tilesState.map((tile, tileIndex) => {
                    return <Tile key={tileIndex} tile={tile} />;
                })}
            </div>
        </div>
    );
};
