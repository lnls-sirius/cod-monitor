import { ModalInfo } from "../../controllers/Patterns/interfaces"
import { BpmDispatcher } from "../../redux/dispatcher";
import AddBPM from "../../components/BPM/AddBPM";

export const modalInfo: ModalInfo = {
    "BPM": {
        title: "Add BPM",
        component: <AddBPM/>,
        icon: 'list',
        close: ()=>BpmDispatcher.setChangeBpm(true)
    }
}
