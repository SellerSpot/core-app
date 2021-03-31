import { isUndefined } from 'lodash';
import React, { ReactElement, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import create, { GetState, SetState } from 'zustand';
import SubMenuTile from '../SubMenuTile/SubMenuTile';
import styles from './SubMenu.module.scss';
import { ISubMenuProps } from './SubMenu.types';

type TSubMenuStore = {
    tiles: ISubMenuProps['tiles'];
    setTilesData: (tilesData: ISubMenuProps['tiles']) => void;
    updateChildTilesVisible: (index: number) => void;
};

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

export default function SubMenu(props: ISubMenuProps): ReactElement {
    // getting objects from the state
    const { tiles, updateChildTilesVisible, setTilesData } = useTilesStore();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        // loading the tiles data into local store
        setTilesData(props.tiles);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.upperTiles}>
                {tiles.map((tile, key) => {
                    // checking if the tile is selected
                    const isTileSelected = tile.routesToWatch?.includes(location.pathname);
                    return (
                        <div key={key + tile.title} className={styles.tileGroup}>
                            <SubMenuTile
                                childTilesVisible={
                                    isUndefined(tile.childTilesVisible)
                                        ? false
                                        : tile.childTilesVisible
                                }
                                title={tile.title}
                                disabled={tile.disabled}
                                selected={isTileSelected}
                                miniTile={false}
                                icon={tile.icon}
                                showTailIcon={tile.childTiles?.length > 0}
                                events={{
                                    onClick: () => {
                                        // checking if children exists for this tile
                                        if (tile.childTiles?.length > 0) {
                                            updateChildTilesVisible(key);
                                        } else {
                                            // redirecting page
                                            history.push(tile.redirectRoute);
                                        }
                                    },
                                }}
                            />
                            {tile.childTilesVisible && tile.childTiles?.length > 0
                                ? tile.childTiles.map((childTile, childKey) => {
                                      // checking if the tile is selected
                                      const isChildTileSelected = childTile.routesToWatch?.includes(
                                          location.pathname,
                                      );
                                      return (
                                          <SubMenuTile
                                              key={childKey + childTile.title}
                                              title={childTile.title}
                                              disabled={childTile.disabled}
                                              selected={isChildTileSelected}
                                              events={{
                                                  onClick: () => {
                                                      history.push(childTile.redirectRoute);
                                                  },
                                              }}
                                              miniTile={true}
                                          />
                                      );
                                  })
                                : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
