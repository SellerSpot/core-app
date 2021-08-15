import React, { forwardRef, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { CSSProperties } from '@material-ui/styles';
import { clamp } from 'lodash';
import { useReactToPrint } from 'react-to-print';
import { useWindowSize } from '@sellerspot/universal-components';

import styles from './BillHolder.module.scss';
import { IBillHolderProps, TBillHolderRef } from './BillHolder.types';
import { BillHolderControlPanel } from './Components/BillHolderControlPanel/BillHolderControlPanel';

const BillHolderComponent = (props: IBillHolderProps, ref: TBillHolderRef): ReactElement => {
    const { children, enablePrint } = props;

    // hooks
    const targetContainerRef = useRef<HTMLDivElement>(null);
    const zoomableWrapperRef = useRef<HTMLDivElement>(null);
    const dimension = useWindowSize();
    const handlePrint = useReactToPrint({
        content: () => targetContainerRef.current,
        onAfterPrint: () => {
            // resolve promise
        },
    });

    // state
    const [defaultBillScale, setDefaultBillScale] = useState(1);
    const [billScale, setBillScale] = useState(1);
    const [billMeasurements, setBillMeasurements] = useState({
        billHeight: 0,
        billWidth: 0,
    });
    const { billHeight, billWidth } = billMeasurements;

    // effects
    // used to detect scroll
    useEffect(() => {
        document.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);

    // used to get the height of bill / triggers when children changes
    useEffect(() => {
        setMeasurementsAndScaling();
    }, [targetContainerRef.current, zoomableWrapperRef.current, children, dimension]);

    // on mount attach print reference to the parent
    useEffect(() => {
        if (ref?.current !== undefined) ref.current = { triggerPrint: handlePrint };
    }, []);

    // handlers
    const scale = (up: boolean) => {
        setBillScale((state) => {
            let newScale = state;
            newScale = up ? state + 0.1 : state - 0.1;
            return clamp(newScale, 0.3, 2.0);
        });
    };

    const handleScroll = useCallback(
        (event: React.WheelEvent<HTMLDivElement> | WheelEvent) => {
            if (event.ctrlKey) {
                event.preventDefault();
                if (event.deltaY > 0) scale(false);
                else if (event.deltaY < 0) scale(true);
            }
        },
        [setBillScale],
    );

    const deriveInitialScale = (): number => {
        const wrapperWidth = zoomableWrapperRef.current.clientWidth;
        const targetWidth = children.props.dimension.width; // got from BillSettings.tsx
        if (targetWidth >= wrapperWidth) {
            const eightFivePercentOfWrapper = wrapperWidth * 0.85;
            const derivedScale = eightFivePercentOfWrapper / targetWidth;
            return +derivedScale.toFixed(2);
        }
        return 1;
    };

    const setMeasurementsAndScaling = () => {
        const firstChildElement = targetContainerRef.current?.firstChild as HTMLDivElement;
        setBillMeasurements({
            billWidth: firstChildElement?.clientWidth,
            billHeight: firstChildElement?.clientHeight,
        });
        const initialScale = deriveInitialScale();
        setDefaultBillScale(initialScale);
        setBillScale(initialScale);
    };

    const resetToDefaultScaleHandler = () => {
        setMeasurementsAndScaling();
    };

    // styles
    const billWrapperStyle: CSSProperties = {
        width: billWidth * billScale,
        height: billHeight * billScale,
    };

    const billStyle: CSSProperties = {
        transform: `scale(${billScale})`,
        transformOrigin: '0 0',
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.billHolderWrapper} ref={zoomableWrapperRef}>
                    <div className={styles.billWrapper} style={billWrapperStyle}>
                        <div style={billStyle} ref={targetContainerRef}>
                            {children}
                        </div>
                    </div>
                </div>
                <BillHolderControlPanel
                    billScale={billScale}
                    setBillScale={setBillScale}
                    handlePrint={enablePrint ? handlePrint : undefined}
                    resetToDefaultScale={{
                        callBack: resetToDefaultScaleHandler,
                        hasReset: defaultBillScale !== billScale,
                    }}
                />
            </div>
        </>
    );
};

export const BillHolder = forwardRef(BillHolderComponent);
