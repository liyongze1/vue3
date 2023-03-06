import { defineStore } from "pinia";
export const addGoodlist=defineStore("addGoodlist",{
    state:()=>{
        return {
            name:"",
            cid:"",
        }
    },
    actions:{
        setAddgoodList(nmae,cid){
            this.name=nmae
            this.cid=cid
        }
    }
})