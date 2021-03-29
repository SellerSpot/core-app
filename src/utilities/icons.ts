import { MdHome } from 'react-icons/md';
import { FaCashRegister } from 'react-icons/fa';
import { BiBox } from 'react-icons/bi';
import { RiBillLine } from 'react-icons/ri';
import { VscChecklist, VscSettings } from 'react-icons/vsc';
import { BsQuestionSquare } from 'react-icons/bs';

export const ICONS = {
    WORKSPACES: {
        HOME: MdHome,
        MANAGEMENT: VscSettings,
        POS: FaCashRegister,
        CATALOGUE: VscChecklist,
    },
    SUBMENUS: {
        SALES: FaCashRegister,
        INVENTORY: BiBox,
        BILLSETTINGS: RiBillLine,
    },
    OTHER: {
        DEFAULT: BsQuestionSquare,
    },
};
