import { defineStore } from "pinia";
export const addGoodsEdit=defineStore("addGoodsEdit",{
    state:()=>({
        //添加商品存储的数据
        addGoods:{}
    }),
    actions:{
        setAddgoods(goodsInfo){
            this.addGoods=goodsInfo
        },
        removeAddgoods(){
            this.addGoods={}
        }
    },
    getters:{
    },
    persist: {
        enabled: true,
        strategies: [
            {
              key:"addGoodsInfo",
              paths: ["addGoods"],
              storage: localStorage,
            }
          ]
      }
})