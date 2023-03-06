import axios from "@/utils/axios"
const api={
    // 首页-销量额等数据统计
    Home_Sell:"/api/home/dataCount",
    //首页折线图数据统计 月销量、月销售额
    Home_MoonSell:"/api/home/format",
    //首页 -今日 -订单统计
    Home_toDay:"/api/home/orderinfo"
}
export function Home_Sell(){
    return axios.get(api.Home_Sell);
}
export function Home_MoonSell(){
    return axios.get(api.Home_MoonSell);
}
export function Home_toDay(){
    return axios.get(api.Home_toDay);
}