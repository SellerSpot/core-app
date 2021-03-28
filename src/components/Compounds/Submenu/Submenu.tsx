import { merge } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';
import SubmenuTile from '../SubmenuTile/SubmenuTile';
import styles from './Submenu.module.scss';
import { ISubmenuProps } from './Submenu.types';

const defaultProps: ISubmenuProps = {
    tiles: [
        {
            title: 'Sample',
            childTilesVisible: false,
            disabled: true,
            pathToWatch: [''],
            childTiles: [
                {
                    title: 'SubMenu',
                    pathToWatch: [''],
                    disabled: false,
                },
            ],
        },
        {
            title: 'Sample',
            childTilesVisible: true,
            disabled: false,
            pathToWatch: ['/iframe.html'],
            childTiles: [
                {
                    title: 'SubMenu',
                    disabled: false,
                    pathToWatch: ['/iframe.html'],
                },
            ],
        },
    ],
};

export default function Submenu(props: ISubmenuProps) {
    const requiredProps = merge(defaultProps, props);

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
                            <SubmenuTile
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
                                          <SubmenuTile
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
