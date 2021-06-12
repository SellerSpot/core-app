export interface ITaxBracket {
    name: string;
    rate: number;
    isStateTax: boolean;
}

export interface ITaxGroup {
    name: string;
    brackets: ITaxBracket[];
}

export interface ITaxSettingsState {
    taxBrackets: ITaxBracket[];
    taxGroups: ITaxGroup[];
    showSliderModal: boolean;
}
