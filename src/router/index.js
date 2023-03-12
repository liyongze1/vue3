import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout.vue"
import Home from "@/views/layout/content/Home/Home.vue"
import Login from "@/views/layout/login/Login.vue"
import Product from "@/views/layout/content/product/product_list/Product_list.vue"
const Addgoods=()=>import("@/views/layout/content/product/product_list/Addgoods.vue")
const AddDetails=()=>import("@/views/layout/content/product/product_list/adddetails/AddDetails")
const Order_list=()=>import("@/views/layout/content/order/Order_list.vue")
const Order_result=()=>import("@/views/layout/content/order/Order_result.vue")
const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    meta:{
      title:"首页"
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/product",
        name: "product",
        redirect:"/product/list",
        meta:{
          title:"产品管理"
        },
        children: [
          {
            path: "list",
            name: "list",
            component: Product,
            meta:{
              title:"产品列表"
            },
          },
          {
            path:"addgoods",
            name:"addgoods",
            component:Addgoods,
            meta:{
              title:"添加商品",
              activeeae:"/product/list"
            }
          },{
            path:"addDetails",
            name:"addDetails",
            component:AddDetails,
            meta:{
              title:"产品详情",
            }
          }
        ]
      },
      {
        path:"/order",
        name:"order",
        redirect:"/order/orderList",
        meta:{
          title:"订单管理"
        },
        
        children:[
          { 
              path: "orderList",
              name: "orderList",
              component: Order_list,
              meta:{
                title:"订单列表"
              },
          },
          { 
              path: "orderResult",
              name: "orderResult",
              component: Order_result,
              meta:{
                title:"汇总清单"
              },
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
