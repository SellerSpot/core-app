import cn from 'classnames';
import { merge } from 'lodash';
import React from 'react';
import SubmenuTile from '../SubmenuTile/SubmenuTile';
import styles from './Submenu.module.scss';
import { ISubmenuProps } from './Submenu.types';

const defaultProps: ISubmenuProps = {
    tiles: [
        {
            title: 'Sample',
            childTilesVisible: false,
            selected: false,
            childTiles: [
                {
                    title: 'SubMenu',
                    selected: false,
                },
            ],
        },
        {
            title: 'Sample',
            childTilesVisible: true,
            selected: true,
            childTiles: [
                {
                    title: 'SubMenu',
                    selected: true,
                },
            ],
        },
    ],
};

export default function Submenu(props: ISubmenuProps) {
    const requiredProps = merge(defaultProps, props);

    const wrapperClassName = cn(styles.wrappers);

    return (
        <div className={styles.wrapper}>
            <div className={styles.upperTiles}>
                {requiredProps.tiles.map((tile) => {
                    return (
                        <div className={styles.tileGroup}>
                            <SubmenuTile
                                childTilesVisible={tile.childTilesVisible}
                                title={tile.title}
                                selected={tile.selected}
                                miniTile={false}
                                events={{
                                    onClick: tile.events?.onClick,
                                }}
                            />
                            {tile.childTilesVisible
                                ? tile.childTiles.map((childTile) => {
                                      return (
                                          <SubmenuTile
                                              title={childTile.title}
                                              selected={childTile.selected}
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
