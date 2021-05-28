import { CSSProperties } from '@material-ui/styles';
import { inRange } from 'lodash';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Bill90MM } from '../Bill90MM/Bill90MM';
import styles from './BillHolder.module.scss';
import { IBillHolderProps } from './BillHolder.types';
import { BillHolderControlPanel } from './Components/BillHolderControlPanel/BillHolderControlPanel';

export const BillHolder = (props: IBillHolderProps): ReactElement => {
    const { billProps } = props;

    const billReference = useRef<HTMLDivElement>(null);
    const [billScale, setBillScale] = useState(1);
    const [billMeasurements, setBillMeasurements] = useState({
        billHeight: 0,
        billWidth: 0,
    });
    const { billHeight, billWidth } = billMeasurements;

    const handlePrint = useReactToPrint({
        content: () => billReference.current,
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
        setBillMeasurements({
            billHeight: billReference.current?.clientHeight,
            billWidth: billReference.current?.clientWidth,
        });
    }, [billReference.current]);

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
                    <Bill90MM {...billProps} style={billStyle} billReference={billReference} />
                </div>
            </div>
            <BillHolderControlPanel
                billScale={billScale}
                setBillScale={setBillScale}
                handlePrint={handlePrint}
            />
        </div>
    );
};
