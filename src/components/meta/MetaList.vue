<template>
    <top-bar></top-bar>



    <div class="container">
        <div class="container-item">
            <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="hash_code">
                    <a-input v-model:value="formState.hash_code" placeholder="根据 hash_code 筛选，可以不填" />
                </a-form-item>


                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" :loading="searchLoading" @click="sendRequest">
                        提交
                    </a-button>
                    <span style="margin-left: 25px"></span>
                    <a-button @click="clearForm">清空</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>

    <div class="container">
        <a-table :columns="columns" :data-source="dataSource" :pagination="false" style="overflow-x: auto">
            <template v-slot:bodyCell="{ text, record, column }">
                <template v-if="column.key === 'enabled'">
                    <template v-if="text"> ✅ </template>
                    <template v-else> ❌</template>
                </template>

                <template v-if="column.key === 'ingested'">
                    <div>
                        <template v-if="text"> ✅ </template>
                        <template v-else> ❌ </template>
                    </div>
                </template>



                <template v-if="column.key === 'file_url'">
                    <div v-if="record">
                        <a-image :width="200" :src="record.file_url"></a-image>
                    </div>
                </template>
            </template>
        </a-table>
    </div>

    <a-drawer :visible="isDrawerVisible" placement="right" @close="closeDrawer" :width="1000">
        <div v-if="selectedRowData">
            <p v-if="state.textContent">{{ state.textContent }}</p>
        </div>
    </a-drawer>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";

onMounted(async () => {
    document.title = "母本列表"; // 设置浏览器标签页的标题
});

const route = useRoute();
const router = useRouter();

const searchLoading = ref(false);

const selectedRowData = ref(null); // 保存选中行的数据

const dataSource = ref([]);
const isDrawerVisible = ref(false);

const state = reactive({
    textContent: "",
});

const openDrawer = (record) => {
    selectedRowData.value = record;
    fetchText(record.file_url);
    isDrawerVisible.value = true;
};

const closeDrawer = () => {
    isDrawerVisible.value = false;
    state.textContent = null;
    selectedRowData.value = null; // 关闭悬浮窗时重置选中行数据
};

const fetchText = (file_url) => {
    const url = file_url;
    axios
        .get(url)
        .then((response) => {
            state.textContent = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

const formState = reactive({
    hash_code: route.query.hash_code || null,
    company_id: route.query.company_id || null,
    limit: route.query.limit || 20,
});

const columns = [
    {
        title: "file_url",
        dataIndex: "file_url",
        key: "file_url",
    },
    {
        title: "id(Mysql)",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "hash_code",
        dataIndex: "hash_code",
        key: "hash_code",
    },
    {
        title: "milvus_id",
        dataIndex: "milvus_id",
        key: "milvus_id",
    },
    {
        title: "file_name",
        dataIndex: "file_name",
        key: "file_name",
    },

    {
        title: "created_at",
        dataIndex: "created_at",
        key: "created_at",
    },
    {
        title: "updated_at",
        dataIndex: "updated_at",
        key: "updated_at",
    },
];

const sendRequest = () => {
    const urlParams = new URLSearchParams();
    for (const key in formState) {
        if (Reflect.has(formState, key)) {
            if (formState[key] === "") {
                formState[key] = null;
            }
            if (formState[key] !== null) {
                urlParams.set(key, formState[key]);
            }
        }
    }

    window.history.replaceState(null, null, `?${urlParams.toString()}`);

    searchLoading.value = true;

    const queryParams = {};

    for (const key in formState) {
        if (Reflect.has(formState, key)) {
            if (formState[key] !== null) {
                queryParams[key] = formState[key];
            }
        }
    }

    const url = "http://127.0.0.1:6200/meta/image";
    axios
        .get(url, {
            params: queryParams,
        })
        .then((response) => {
            dataSource.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            searchLoading.value = false;
        });
};

sendRequest();


const navigateToRoot = () => {
    router.push("/");
};


const openKeywordPushed2 = (hash_code) => {
    let url = router.resolve({
        name: "KeywordPushed",
        query: { hash_code },
    }).href;
    window.open(url, "_blank");
};

const openMetaDetail = (hash_code) => {
    let url = router.resolve({
        name: "MetaDetail",
        query: { hash_code },
    }).href;
    window.open(url, "_blank");
};

const labelCol = {
    style: {
        width: "150px",
    },
};
const wrapperCol = {
    span: 14,
};
</script>

<style>
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
</style>
