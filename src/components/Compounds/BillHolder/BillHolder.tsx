import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { CSSProperties } from '@material-ui/styles';
import { inRange } from 'lodash';
import { useReactToPrint } from 'react-to-print';

import styles from './BillHolder.module.scss';
import { IBillHolderProps } from './BillHolder.types';
import { BillHolderControlPanel } from './Components/BillHolderControlPanel/BillHolderControlPanel';

export const BillHolder = (props: IBillHolderProps): ReactElement => {
    const { children, enablePrint } = props;

    // hooks
    const zoomableContainerRef = useRef<HTMLDivElement>(null);

    // state
    const [billScale, setBillScale] = useState(1);
    const [billMeasurements, setBillMeasurements] = useState({
        billHeight: 0,
        billWidth: 0,
    });
    const { billHeight, billWidth } = billMeasurements;

    // handlers
    const handlePrint = useReactToPrint({
        content: () => zoomableContainerRef.current,
    });

    const scaleUpBill = () => {
        setBillScale((state) => {
            let newScale = state;
            if (inRange(state, 0.3, 0.4)) {
                newScale = 0.3;
            } else if (state >= 0.3) {
                newScale = state - 0.1;
            }
            return newScale;
        });
    };

    const scaleDownBill = () => {
        setBillScale((state) => {
            let newScale = state;
            if (state <= 2.0) {
                newScale = state + 0.1;
            }
            return newScale;
        });
    };

    const handleScroll = useCallback(
        (event: React.WheelEvent<HTMLDivElement> | WheelEvent) => {
            if (event.ctrlKey) {
                event.preventDefault();
                if (event.deltaY > 0) scaleUpBill();
                else if (event.deltaY < 0) scaleDownBill();
            }
        },
        [setBillScale],
    );

    // used to detect scroll
    useEffect(() => {
        document.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);

    // used to get the height of bill
    useEffect(() => {
        const firstChildElement = zoomableContainerRef.current?.firstChild as HTMLDivElement;
        setBillMeasurements({
            billWidth: firstChildElement?.clientWidth,
            billHeight: firstChildElement?.clientHeight,
        });
    }, [zoomableContainerRef.current]);

    const billWrapperStyle: CSSProperties = {
        width: billWidth * billScale,
        height: billHeight * billScale,
    };

    const billStyle: CSSProperties = {
        transform: `scale(${billScale})`,
        transformOrigin: '0 0',
    };

    return (
        <div className={styles.totalWrapper}>
            <div className={styles.billHolderWrapper}>
                <div className={styles.billWrapper} style={billWrapperStyle}>
                    <div style={billStyle} ref={zoomableContainerRef}>
                        {children}
                    </div>
                </div>
            </div>
            <BillHolderControlPanel
                billScale={billScale}
                setBillScale={setBillScale}
                handlePrint={enablePrint ? handlePrint : undefined}
            />
        </div>
    );
};
