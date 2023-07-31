import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const authStatus = atom({
    key: "authStatus",
    default: {
        realname: "",
        result: "",
        sesskey: ""
    },
    effects_UNSTABLE: [persistAtom]
});