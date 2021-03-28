import React from 'react';
import { useLocation } from 'react-router-dom';
import SubMenuTile from '../Compounds/SubMenuTile/SubMenuTile';
import styles from './Submenu.module.scss';
import { ISubMenuProps } from './SubMenu.types';

export default function SubMenu(props: ISubMenuProps) {
    const requiredProps = props;

    // getting current app path to know which tiles are selected
    const currentLocation = useLocation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.upperTiles}>
                {requiredProps.tiles.map((tile) => {
                    // checking if the tile is selected
                    const isTileSelected = tile.pathToWatch.includes(currentLocation.pathname);
                    return (
                        <div className={styles.tileGroup}>
                            <SubMenuTile
                                childTilesVisible={tile.childTilesVisible}
                                title={tile.title}
                                disabled={tile.disabled}
                                selected={isTileSelected}
                                miniTile={false}
                                showTailIcon={tile.childTiles?.length > 0}
                                events={{
                                    onClick: tile.events?.onClick,
                                }}
                            />
                            {tile.childTilesVisible
                                ? tile.childTiles.map((childTile) => {
                                      // checking if the tile is selected
                                      const isChildTileSelected = childTile.pathToWatch.includes(
                                          currentLocation.pathname,
                                      );
                                      return (
                                          <SubMenuTile
                                              title={childTile.title}
                                              disabled={childTile.disabled}
                                              selected={isChildTileSelected}
                                              events={{
                                                  onClick: childTile.events?.onClick,
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
