import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout.vue"
import Home from "@/views/layout/content/Home/Home.vue"
import Login from "@/views/layout/login/Login.vue"
import Product from "@/views/layout/content/product/product_list/Product_list.vue"
const Addgoods=()=>import("@/views/layout/content/product/product_list/Addgoods.vue")
const AddDetails=()=>import("@/views/layout/content/product/product_list/adddetails/AddDetails")
const Order_list=()=>import("@/views/layout/content/order/Order_list.vue")
const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home
      },
      {
        path: "/product",
        name: "product",
        children: [
          {
            path: "list",
            name: "list",
            component: Product,
          },
          {
            path:"addgoods",
            name:"addgoods",
            component:Addgoods,
            meta:{
              activeeae:"/product/list"
            }
          },{
            path:"addDetails",
            name:"addDetails",
            component:AddDetails,
          }
        ]
      },
      {
        path:"/order",
        name:"order",
        children:[
          { 
              path: "orderList",
              name: "orderList",
              component: Order_list,
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
