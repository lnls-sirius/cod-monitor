import {
    faClock, faPencilAlt, faPlus,
    faC, faD, faQ, faS, faTrashCan,
    faListCheck, IconDefinition
} from "@fortawesome/free-solid-svg-icons";

interface iconListInterface{
    [key: string]: IconDefinition
}

export const iconList: iconListInterface = {
    'clock': faClock,
    'pencil': faPencilAlt,
    'plus': faPlus,
    'c': faC,
    'd': faD,
    'q': faQ,
    's': faS,
    'trash': faTrashCan,
    'list': faListCheck,
}
