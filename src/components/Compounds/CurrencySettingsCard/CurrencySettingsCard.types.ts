export interface ICurrency {
    currencyName: string;
    currencyLogo: string;
}

export interface ICurrencySettingsCardProps {
    currencyChangeCallback?: (currencyIndex: number) => void;
    currencies: ICurrency[];
}
