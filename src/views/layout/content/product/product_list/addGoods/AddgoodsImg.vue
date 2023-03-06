<template>
  <el-upload
    :action="imgUrl.upLoad"
    list-type="picture-card"
    :auto-upload="true"
    :on-success="change"
    :file-list="fileList_all"
  >
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import imgUrl from "@/api/product/product";
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const props = defineProps(["Img"]);
//上传的文件列表
const fileList_all = ref([]);
//上传的文件列表地址
const fileListCopy = ref([]);
const emit = defineEmits(["fileListCopy"]);
//删除文件列表
const handleRemove = (file) => {
  console.log(file);
};
watch(props.Img,(ne)=>{
  console.log("-----",ne);
  fileList_all.value=ne;
},{immediate:true})

//上传图片的钩子
function change(response, file, fileList) {
  let arr = [];
  fileList.forEach((item) => {
    arr.push({ url: str(item.response.url), name: item.response.name });
  });
  fileListCopy.value = arr;
  emit("fileListCopy", fileListCopy.value);
  console.log("-----------------------", fileListCopy.value);
}
//解决跨域格式
function str(n) {
  return n.replace(/^upload/, "/api");
}
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
</script>
