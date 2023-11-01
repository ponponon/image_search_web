<template>
    <top-bar></top-bar>
    <div class="container">
        <div class="container-item">
            <div>
                <a-row>
                    <a-typography-title class="centered-text">以图搜图</a-typography-title>
                </a-row>
                <br />

                <a-row>
                    <a-col :span="24" style="text-align: center">
                        <a-upload v-model:file-list="fileList_1" name="avatar" list-type="picture-card"
                            class="avatar-uploader" :before-upload="handleBeforeUpload1" @preview="handlePreview">
                            <div>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">选择图片</div>
                            </div>
                        </a-upload>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="24" style="text-align: center">
                        <a-button type="primary" @click="handleUpload" style="text-align: center">上传并搜索</a-button>
                    </a-col>
                </a-row>

                <a-row>
                    <a-typography-paragraph>  <blockquote> TIPs: 评分范围在 0-100 分，100 分是满分。如果图片相似度太小，会出现负分</blockquote> </a-typography-paragraph>
                </a-row>

            </div>
        </div>
    </div>

    <a-row>
        <template v-for="(item, index) in responseData" :key="index">
            <a-col :span="6">
                <div class="container-item"
                    style="background-color: #ffffff;margin-left: 5px; margin-right: 5px; display: flex; flex-direction: column; align-items: center;">
                    <!-- 使用flex布局，让img标签的宽度自动填充整个容器 -->
                    <img style="width: 100%; max-width: 100%;" alt="logo" :src="item.file_relative_url" />
                    <br />
                    <p>母本 meta_uuid</p>
                    <br />
                    <p>{{ item.meta_uuid }}</p>
                    <div>相似度评分: <p style="font-size: 30px; margin-bottom: 0">{{ formattedScore(item.score) }}</p>
                    </div>
                    <p>欧式距离 {{ formattedDistance(item.distance) }}</p>
                </div>
            </a-col>
        </template>
    </a-row>

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
    document.title = "图片搜索"; // 设置浏览器标签页的标题
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
    fileList_1.value = fileList_1.value.slice(1);
    return false; // 阻止默认上传行为
};

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");

const loading = false;

// 标记每个图片是否已加载
const itemLoaded = ref(false);

// 在图片加载后将itemLoaded设置为true
const onImageLoad = () => {
    itemLoaded.value = true;
};


const formattedDistance = (distance) => {
    return distance.toFixed(4);
};

const maxImageWidth = 250;

const calculateImageWidth = () => {
    const windowWidth = window.innerWidth;
    console.log('windowWidth', windowWidth)
    const cw = Math.min(maxImageWidth, windowWidth / 4)
    console.log('cw', cw)
    return cw // 这里除以4是因为每行有4个图片
};


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

const formattedScore = (score) => {
    return score.toFixed(2);
};

const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileList_1.value[0].originFileObj);

    try {
        const response = await axios.post(
            "/api/sample/file",
            formData
        );
        responseBody.value = response.data.data;
        responseData.value = response.data.data;
    } catch (error) {
        console.error(error);
        message.error("请求出错了");
    }
};

const openMetaDetail = (meta_uuid) => {
    let url = router.resolve({
        name: "MetaDetail",
        query: { meta_uuid },
    }).href;
    window.open(url, "_blank");
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
.centered-text {
    display:inline-block;
    text-align: center;
    margin:0 auto;
}
</style>
