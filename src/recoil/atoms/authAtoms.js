import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const authStatus = atom({
    key: "authStatus",
    default: {
        userId: "",
        current: false
    },
    effects_UNSTABLE: [persistAtom]
});