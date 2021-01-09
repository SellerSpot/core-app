import { IoMdAppstore, IoMdNotifications, IoMdPlay } from 'react-icons/io';
import { IoAppsSharp, IoHome } from 'react-icons/io5';
import { RiBillFill } from 'react-icons/ri';
import { FaUserAlt, FaCaretUp, FaCashRegister, FaPlug } from 'react-icons/fa';
import { RiLogoutBoxFill, RiSettings3Fill } from 'react-icons/ri';
import { CgFormatSlash } from 'react-icons/cg';
import { FiShoppingBag, FiGlobe } from 'react-icons/fi';
import { GrInstallOption } from 'react-icons/gr';

export const ICONS = {
    HOME: IoHome,
    INSTALLED_APPS: IoAppsSharp,
    APP_STORE: IoMdAppstore,
    BILLING: RiBillFill,
    SETTINGS: RiSettings3Fill,
    LOGOUT: RiLogoutBoxFill,
    USER_ALT: FaUserAlt,
    CARET_UP: FaCaretUp,
    FORWARD_SLASH: CgFormatSlash,
    NOTIFICATION: IoMdNotifications,
    CASH_REGISTER: FaCashRegister,
    SHOPPING_BAG: FiShoppingBag,
    APP: IoMdPlay,
    PLUGIN: FaPlug,
    INSTALL_APP: GrInstallOption,
    GLOBE: FiGlobe,
};
