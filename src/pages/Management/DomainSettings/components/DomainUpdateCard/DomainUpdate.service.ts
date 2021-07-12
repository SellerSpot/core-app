import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { CONFIG } from 'config/config';
import { FieldMetaState } from 'react-final-form';
import { requests } from 'requests/requests';
import { redirectTo } from 'utilities/general';
import * as yup from 'yup';
import { IDomainUpdateCardFormValues, TUpdatFormError } from './DomainUpdateCard.types';

export default class DomainUpdateCardService {
    static initialFormValues: IDomainUpdateCardFormValues = {
        domainName: '',
    };

    private static validationSchema: yup.SchemaOf<IDomainUpdateCardFormValues> = yup
        .object()
        .shape({
            domainName: yup
                .string()
                .required('Store url is required')
                .min(3, 'NOT_AVAILABLE')
                .max(15, 'NOT_AVAILABLE'),
        });

    static storeUrlAvailabilityCheckHandler = async (
        value: string,
        currentDomain: string,
    ): Promise<string> => {
        try {
            const fieldPath: keyof IDomainUpdateCardFormValues = 'domainName';
            // get schema instance for the required field
            const requiredSchema: yup.SchemaOf<IDomainUpdateCardFormValues['domainName']> =
                yup.reach(DomainUpdateCardService.validationSchema, fieldPath);
            requiredSchema.validateSync(value, { abortEarly: true });
            // do api validation here
            if (value === currentDomain) {
                throw new Error('SAME_AS_CURRENT');
            } else {
                // request
                const response =
                    await requests.management.domainSettingsRequest.checkDomainAvailability(value);
                if (!response?.status) {
                    throw new Error('NOT_AVAILABLE');
                }
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            // uncaught error
            return error?.message; // which will be caught in ui layer and will be displayed as domain not availble
        }
    };

    static getStoreUrlFieldProps = (
        value: string,
        { error, validating, valid, modified, submitError }: FieldMetaState<string>,
    ): {
        helperMessage: IInputFieldProps['helperMessage'];
        inputFieldTheme: IInputFieldProps['theme'];
    } => {
        const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;
        let helperTextType: IInputFieldProps['helperMessage']['type'] = 'none';
        let helperTextContent: string = error || submitError;
        let inputFieldTheme: IInputFieldProps['theme'] = 'primary';
        const helperMessageEnabled = (error || validating || valid || submitError) && modified;
        if (helperMessageEnabled) {
            if (validating) {
                helperTextType = 'loading';
                helperTextContent = 'Checking for availability';
            } else if (valid) {
                helperTextType = 'success';
                inputFieldTheme = 'success';
                helperTextContent = `${value}${baseDomainSuffix} is available.`;
            } else if (error || submitError) {
                if (error === 'SAME_AS_CURRENT') {
                    // same as current domain error
                    helperTextType = 'warning';
                    inputFieldTheme = 'warning';
                    helperTextContent = `${value}${baseDomainSuffix} is your current domain.`;
                } else {
                    // other error
                    helperTextType = 'error';
                    inputFieldTheme = 'danger';
                    helperTextContent =
                        error === 'NOT_AVAILABLE'
                            ? `${value}${baseDomainSuffix} is not available.`
                            : error || submitError;
                }
            }
        }
        const helperMessage: IInputFieldProps['helperMessage'] = {
            enabled: helperMessageEnabled,
            type: helperTextType,
            content: helperTextContent,
        };

        return {
            helperMessage,
            inputFieldTheme,
        };
    };

    static updateDomain = async (domain: string): Promise<Partial<TUpdatFormError>> => {
        const { status, data, error } =
            await requests.management.domainSettingsRequest.updateDomain(domain);
        if (status) {
            const { url } = data?.domainDetails;
            showNotify('Domain updated successfully, redirecting to your new domain', {
                autoHideDuration: 2000,
                onClose: () => {
                    redirectTo(url, '_self', true);
                },
            });
            return;
        } else {
            showNotify(error?.message ?? 'Something went wrong! please try again later');
            return { domainName: error?.message ?? 'Something went wrong! please try again later' };
        }
    };
}
