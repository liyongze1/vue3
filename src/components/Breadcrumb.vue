    <template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in list" :key="item.title" :to="{path:item.path}">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { computed, onMounted } from "vue";
import {useRoute} from "vue-router"
const route=useRoute()
const list=computed(()=>{
  return route.matched
})
console.log(list);
</script>

<style>
</style>