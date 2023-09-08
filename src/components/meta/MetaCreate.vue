<template>
    <top-bar></top-bar>

    <div class="container">
        <div class="container-item">
            <div>
                <a-row>
                    <a-typography-title>使用说明:</a-typography-title>
                </a-row>
                <a-row>
                    <a-typography-paragraph> 选择图片 </a-typography-paragraph>
                </a-row>

                <a-row>
                    <a-typography-paragraph>
                        评分范围在 0-100 分，100 分是满分。如果图片相似度太小，会出现负分
                    </a-typography-paragraph>
                </a-row>

                <a-row>
                    <br />
                </a-row>

                <a-row>
                    <a-col :span="24" style="text-align: center">
                        <a-upload v-model:file-list="fileList_1" name="avatar" list-type="picture-card"
                            class="avatar-uploader" :before-upload="handleBeforeUpload1" @preview="handlePreview"
                            :multiple="true">
                            <div>
                                <!-- <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined> -->
                                <div class="ant-upload-text">选择图片</div>
                            </div>
                        </a-upload>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="24" style="text-align: center">
                        <a-button type="primary" @click="handleUpload" style="text-align: center">上传</a-button>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>

    <div class="container" v-if="responseBody">
        <div class="container-item">
        </div>
    </div>

    <div class="container">
        <div class="container-item">
            <a-list item-layout="vertical" :data-source="responseData">
                <template #renderItem="{ item }">
                    <div>
                        <img width="272" alt="logo" :src=item.file_url />
                        <p>{{ item.hash_code }}</p>
                    </div>
                </template>
            </a-list>
        </div>
    </div>

    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>

<script setup>
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import { onMounted } from "vue";
import router from "@/router";

onMounted(async () => {
    document.title = "图片录入"; // 设置浏览器标签页的标题
});
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const fileList_1 = ref([]);

const handleBeforeUpload1 = (file) => {
    // fileList_1.value.splice(0);
    return false; // 阻止默认上传行为
};

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = "";
};
const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

const responseBody = ref(null);
const responseData = ref([]);


const handleUpload = () => {
    fileList_1.value.forEach((item, index) => {
        const formData = new FormData();
        formData.append("file", item.originFileObj);

        console.log(`第 ${index + 1} 个文件上传`, item.name);

        axios
            .post("http://127.0.0.1:6200/meta/image/file", formData)
            .then((response) => {
                if (response.status === 500) {
                    console.error(`第 ${index + 1} 个文件上传失败:`, response.data);
                    message.error(response.data.message);
                } else {
                    responseBody.value = response.data;
                    responseData.value = response.data;
                    message.success(item.name + " 上传成功", 2);
                }
            })
            .catch((error) => {
                console.error('捕捉到错误了', error);
                message.error(error.response.data.message);
            });
    })
};



const navigateToRoot = () => {
    router.push("/");
};
</script>

<style>
body {
    background-color: #e9ecef !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.gray-placeholder {
    color: gray;
}

.container {
    margin: 0 auto;
    /* 居中显示 */
    margin-top: 20px;
    max-width: 1440px;
    /* 设置最大宽度为900px */
    background-color: #ffffff;
    /* 浅灰色 */
    border-radius: 0.25rem;
}

.container-item {
    padding: 25px;
    border-width: 0 0 1px;
    margin-bottom: 20px;
}

.theme-icon {
    width: 64px;
    /* 设置图标的宽度 */
    height: 64px;
    /* 设置图标的高度 */
}

.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
