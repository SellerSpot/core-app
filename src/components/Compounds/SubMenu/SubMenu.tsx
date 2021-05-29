import cn from 'classnames';
import { isUndefined } from 'lodash';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routeSelector } from 'store/models/route';
import create, { GetState, SetState } from 'zustand';
import SubMenuTile from '../SubMenuTile/SubMenuTile';
import styles from './SubMenu.module.scss';
import { ISubMenuProps, TSubMenuStore } from './SubMenu.types';

// store to hold data regarding visibility of tiles
const useTilesStore = create<TSubMenuStore>(
    (set: SetState<TSubMenuStore>, get: GetState<TSubMenuStore>) => ({
        tiles: [],
        setTilesData: (tilesData: ISubMenuProps['tiles']) => {
            set({ tiles: tilesData });
        },
        updateChildTilesVisible: (index) => {
            const { tiles } = get();
            // updating childTilesVisible
            if (!isUndefined(tiles[index].childTilesVisible)) {
                tiles[index].childTilesVisible = !tiles[index].childTilesVisible;
            } else {
                tiles[index].childTilesVisible = true;
            }
            // updating state
            set({ tiles: tiles });
        },
    }),
);

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
                debugger;
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

const Tile = (props: {
    tile: ISubMenuProps['tiles'][0];
    tileIndex: number;
    updateChildTilesVisible: (index: number) => void;
}) => {
    const { tile, tileIndex, updateChildTilesVisible } = props;
    const { routeKeys } = useSelector(routeSelector);
    const history = useHistory();
    const { disabled, icon, redirectRoute, routeKey, title, childTiles, childTilesVisible } = tile;

    const tileOnClickHander = () => {
        // checking if children exists for this tile
        if (childTiles?.length > 0) {
            updateChildTilesVisible(tileIndex);
        } else {
            history.push(redirectRoute);
        }
    };
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
            <ChildTile childTiles={childTiles} childTilesVisible={childTilesVisible} />
        </div>
    );
};

export const SubMenu = (props: ISubMenuProps): ReactElement => {
    // getting objects from the state
    const { tiles, updateChildTilesVisible, setTilesData } = useTilesStore();

    useEffect(() => {
        // loading the tiles data into local store
        setTilesData(props.tiles);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.upperTiles}>
                {tiles.map((tile, tileIndex) => {
                    return (
                        <Tile
                            key={tileIndex}
                            tile={tile}
                            tileIndex={tileIndex}
                            updateChildTilesVisible={updateChildTilesVisible}
                        />
                    );
                })}
            </div>
        </div>
    );
};
