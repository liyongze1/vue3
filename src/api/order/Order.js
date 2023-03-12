import axios from "@/utils/axios"
const api={
    //汇总订单的列表 参数page
    Order_collect:"/api/order/collect",
    //汇总的接口
    Order_changeStatus:"/api/order/changeStatus",
    //撤销汇总 要一个id
    Order_cancel:"/api/order/cancel"
}
export default{
    Order_collect(){
        return axios.get(api.Order_collect)
    },
    Order_changeStatus(params){
        return axios.get(api.Order_changeStatus,{params})
    },
    Order_cancel(params){
        return axios.get(api.Order_cancel,{params})
    }
}