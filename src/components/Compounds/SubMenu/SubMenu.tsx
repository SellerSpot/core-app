import { isUndefined } from 'lodash';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

export default function SubMenu(props: ISubMenuProps) {
    // getting objects from the state
    const { tiles, updateChildTilesVisible, setTilesData } = useTilesStore();

    useEffect(() => {
        // loading the tiles data into local store
        setTilesData(props.tiles);
    }, []);

    // getting current app path to know which tiles are selected
    const currentLocation = useLocation();
    return (
        <div className={styles.wrapper}>
            <div className={styles.upperTiles}>
                {tiles.map((tile, key) => {
                    // checking if the tile is selected
                    const isTileSelected = tile.pathToWatch.includes(currentLocation.pathname);
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
                                showTailIcon={tile.childTiles?.length > 0}
                                events={{
                                    onClick: (event) => {
                                        // checking if children exists for this tile
                                        if (tile.childTiles?.length > 0) {
                                            updateChildTilesVisible(key);
                                        }
                                        tile.events?.onClick(event);
                                    },
                                }}
                            />
                            {tile.childTilesVisible && tile.childTiles?.length > 0
                                ? tile.childTiles.map((childTile, childKey) => {
                                      // checking if the tile is selected
                                      const isChildTileSelected = childTile.pathToWatch.includes(
                                          currentLocation.pathname,
                                      );
                                      return (
                                          <SubMenuTile
                                              key={childKey + childTile.title}
                                              title={childTile.title}
                                              disabled={childTile.disabled}
                                              selected={isChildTileSelected}
                                              events={{
                                                  onClick: (event) => {
                                                      childTile.events?.onClick(event);
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
