import {addGoodsEdit} from "./AddgoodsEdit"
import { addGoodlist } from "./AddgoodsList"
export default function useinx() {
    return {
        addGoodsEdit:addGoodsEdit(),
        addGoodlist:addGoodlist(),
    }
}