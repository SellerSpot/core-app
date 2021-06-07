import yup from 'yup';
import { IDomainUpdateFormValues } from './DomainUpdateCard.types';

export default class DomainUpdateService {
    static initialFormValues: IDomainUpdateFormValues = {
        domainName: '',
    };

    private static validationSchema: yup.SchemaOf<IDomainUpdateFormValues> = yup.object().shape({
        domainName: yup
            .string()
            .required('Store url is required')
            .min(3, 'NOT_AVAILABLE')
            .max(15, 'NOT_AVAILABLE'),
    });

    static storeUrlAvailabilityCheckHandler = async (value: string): Promise<string> => {
        try {
            const fieldPath: keyof IDomainUpdateFormValues = 'domainName';
            // get schema instance for the required field
            const requiredSchema: yup.SchemaOf<IDomainUpdateFormValues['domainName']> = yup.reach(
                DomainUpdateService.validationSchema,
                fieldPath,
            );
            requiredSchema.validateSync(value, { abortEarly: true });
            // do api validation here
            // const response = await authRequest.checkDomainAvailability(value);
            // if (!response?.status) {
            //     throw new Error('NOT_AVAILABLE');
            // }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            // uncaught error
            return 'NOT_AVAILABLE'; // which will be caught in ui layer and will be displayed as domain not availble
        }
    };
}
