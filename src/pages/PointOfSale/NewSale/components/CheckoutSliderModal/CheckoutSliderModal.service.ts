import { ESaleStatus } from '../../../../../../.yalc/@sellerspot/universal-types/dist';
import { newSaleState } from '../../NewSale';
import { ICheckoutSaleSummaryViewProps } from '../CheckoutSaleSummaryView/CheckoutSaleSummaryView.types';

export class CheckoutSliderModalService {
    static getComputedViewMode = (): {
        summaryViewMode: ICheckoutSaleSummaryViewProps['viewMode'];
        sliderTitle: string;
    } => {
        let sliderTitle = '';
        let summaryViewMode: ICheckoutSaleSummaryViewProps['viewMode'] = 'checkout';
        // get the title based on the current state
        switch (newSaleState.saleData.status.get()) {
            case ESaleStatus.PARKED:
                sliderTitle = 'Park sale';
                summaryViewMode = 'park';
                break;
            case ESaleStatus.QUOTED:
                sliderTitle = 'Quote sale';
                summaryViewMode = 'quote';
                break;
            case ESaleStatus.COMPLETED:
                sliderTitle = 'Print Bill';
                summaryViewMode = 'print';
                break;
            default:
                sliderTitle = 'Checkout sale';
                summaryViewMode = 'checkout';
        }
        return { sliderTitle, summaryViewMode };
    };
}
