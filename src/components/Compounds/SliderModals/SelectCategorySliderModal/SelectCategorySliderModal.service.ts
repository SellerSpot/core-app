import { ISliderModalProps } from '../../../../../.yalc/@sellerspot/universal-components/dist';
import {
    ISelectCategorySliderModalDynamicProps,
    ISelectCategorySliderModalProps,
} from './SelectCategorySliderModal.types';

type IGetDynamicProps = Pick<ISelectCategorySliderModalProps, 'level'>;

export class SelectCategorySliderModalService {
    static getDynamicProps = (props: IGetDynamicProps): ISelectCategorySliderModalDynamicProps => {
        // props
        const { level } = props;

        // variables
        let type: ISliderModalProps['type'] = 'fixed';
        let width: ISliderModalProps['width'] = '30%';
        let closeButtonType: ISelectCategorySliderModalDynamicProps['closeButtonType'] = 'close';

        // setting type
        if (level === 2) {
            type = 'absolute';
        }

        // setting width
        if (level === 2) {
            width = '100%';
        }

        // setting closeButtonType
        if (level === 2) {
            closeButtonType = 'back';
        }

        // return
        return {
            type,
            width,
            closeButtonType,
        };
    };
}
