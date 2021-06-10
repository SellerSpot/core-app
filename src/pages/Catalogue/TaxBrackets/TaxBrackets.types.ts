export interface ITaxBracket {
    name: string;
    rate: number;
    isStateTax: boolean;
}

export interface ITaxGroup {
    name: string;
    brackets: ITaxBracket[];
}

export interface ITaxBracketsState {
    taxBrackets: ITaxBracket[];
    taxGroups: ITaxGroup[];
    showSliderModal: boolean;
}
