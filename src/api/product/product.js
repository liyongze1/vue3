import axios from "@/utils/axios"
const api={
    /**
 * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
    product_List:"/api/goods/projectList",
    /**
 * 商品查询接口 search
 * 参数：search
 */
    product_Search:"/api/goods/search",
    /**
 * 商品删除接口 id
 */
    product_Delet:"/api/goods/deleteItemById",
    /**
 * 商品添加 类目选择
 * 接口说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：type
 */ 
    product_Add:"/api/goods/itemCategory/selectItemCategoryByParentId",
    // 商品添加
    product_Addgoods:"/api/goods/item/insertTbItem",
    //产品详情所有类目
    product_itemCategory:"/api/itemCategory",
    //添加子类目cid  name
    product_AddDetail:"/api/itemCategory/insertItemCategory",
    //修改商品类目信息 id name
    product_AlterName:"/api/itemCategory/updateCategory",
    //删除商品的类目信息 ids
    product_Delet_Detail:"/api/content/deleteContentCategoryById",
    //新增一级导航类目 name
    product_One_Detail:"/api/itemCategory/insertCategory",
    //新增表格
    product_One_List:"/api/order/list",
    //汇总的接口
    product_One_changeStatus:"/api/order/changeStatus"
}
export default {
    product_List(params){
        return axios.get(api.product_List,{params})
    },
    product_Search(params){
        return axios.get(api.product_Search,{params})
    },
    product_Delet(params){
        return axios.get(api.product_Delet,{params})
    },
    product_Add(params){
        return axios.get(api.product_Add,{params})
    },
    product_AddGoods(params){
        return axios.get(api.product_Addgoods,{params})
    },
    product_itemCategory(){
        return axios.get(api.product_itemCategory)
    },
    product_AddDetail(params){
        return axios.get(api.product_AddDetail,{params})
    },
    product_AlterName(params){
        return axios.get(api.product_AlterName,{params})
    },
    product_Delet_Detail(params){
        return axios.get(api.product_Delet_Detail,{params})
    },
    product_One_Detail(params){
        return axios.get(api.product_One_Detail,{params})
    },
    product_One_List(params){
        return axios.get(api.product_One_List,{params})
    },
    product_One_changeStatus(params){
        return axios.get(api.product_One_changeStatus,{params})
    },
    //上传图片的路径
    upLoad:"/api/upload"
}
