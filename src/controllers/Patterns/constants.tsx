import { ModalInfo } from "./interfaces"
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { BpmDispatcher } from "../../redux/dispatcher";
import AddBPM from "../../components/BPM/AddBPM";
import React from "react";

export const modalInfo: ModalInfo = {
    "BPM": {
        title: "Add BPM",
        component: <AddBPM/>,
        icon: faListCheck,
        close: ()=>BpmDispatcher.setChangeBpm(true)
    }
}
