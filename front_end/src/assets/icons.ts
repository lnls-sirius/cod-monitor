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
    'C': faC,
    'D': faD,
    'Q': faQ,
    'S': faS,
    'trash': faTrashCan,
    'list': faListCheck,
}
