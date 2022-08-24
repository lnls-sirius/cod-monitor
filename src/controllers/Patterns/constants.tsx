import { ModalInfo } from "./interfaces"
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import AddBPM from "../../components/AddBPM";
import React from "react";

export const modalInfo: ModalInfo = {
    "BPM": {
        title: "Add BPM",
        component: <AddBPM/>,
        icon: faListCheck
    }
}
