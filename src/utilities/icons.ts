import {
    MdCheckCircle,
    MdFileDownload,
    MdFullscreen,
    MdHome,
    MdKeyboardArrowRight,
    MdNotifications,
} from 'react-icons/md';
import { FaCashRegister } from 'react-icons/fa';
import { BiBox } from 'react-icons/bi';
import { RiBillLine } from 'react-icons/ri';
import { VscChecklist, VscSettings } from 'react-icons/vsc';
import { BsQuestionSquare } from 'react-icons/bs';
import { CgDetailsMore, CgFormatSlash } from 'react-icons/cg';

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
        BILL_SETTINGS: RiBillLine,
    },
    OTHER: {
        DEFAULT: BsQuestionSquare,
        EXPAND_MENU: MdKeyboardArrowRight,
        FORWARD_SLASH: CgFormatSlash,
        FULL_SCREEN: MdFullscreen,
        SUCCESS_CHECK_CIRCLE: MdCheckCircle,
        NOTIFICATION: MdNotifications,
        INSTALL: MdFileDownload,
    },
};
