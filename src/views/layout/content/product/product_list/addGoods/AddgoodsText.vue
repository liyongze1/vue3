<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, onMounted, ref, shallowRef, watch} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
  props:["descs"],
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const editor = editorRef.value;
    console.log(props);
    // 内容 HTML
    const valueHtml = ref(props.descs);
    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      if (editor == null) return;
      editor.destroy();
    });
    // const stockGoodinfo = localStorage.getItem("addGoodsInfo");
    // if (stockGoodinfo) {
    //   let add = JSON.parse(stockGoodinfo);
    //   if (add.addGoods.image) {
    //     add.addGoods.image = JSON.parse(add.addGoods.image);
    //     valueHtml.value = add.addGoods.descs;
    //   }
    // }
    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    //用setup函数组件需要return才能显示
    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  },
};
</script>  

<style>
</style>