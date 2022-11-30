// File that import all the icons used
import { IconListInterface } from "../interfaces/patterns";

import {
    faClock, faPencilAlt, faPlus,
    faC, faD, faQ, faS, faTrashCan, faY, faX,
    faListCheck, faEye, faXmark, faLineChart, faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

export const iconList: IconListInterface = {
    'clock': faClock,
    'pencil': faPencilAlt,
    'plus': faPlus,
    'x': faXmark,
    'C': faC,
    'D': faD,
    'Q': faQ,
    'S': faS,
    'X': faX,
    'Y': faY,
    'trash': faTrashCan,
    'list': faListCheck,
    'eye': faEye,
    'chart': faLineChart,
    'error': faExclamationCircle
}
