import { ICurrency } from './CurrencySetting.types';

export default class CurrencySettingService {
    static fetchStoreCurrencies = async (): Promise<{
        currencies: ICurrency[];
        currentCurrency: ICurrency;
    }> => {
        return {
            currencies: [
                { logo: '!', name: 'INR' },
                { logo: '@', name: 'USD' },
            ],
            currentCurrency: { logo: '!', name: 'INR' },
        };
    };
}
