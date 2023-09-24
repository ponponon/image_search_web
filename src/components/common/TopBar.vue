<template>
    <a-layout-header :style="{ backgroundColor: '#ffffff' }">
        <!-- 在这里放置顶栏的内容 -->
        <a-menu mode="horizontal" theme="light" default-selected-keys="1" @click="handleMenuClick">
            <a-menu-item key="Home">
                <img class="icon top-icon" src="@/assets/home.svg" alt="Search Engine Logo" style="margin-right: 5px" />
                首页
            </a-menu-item>

            <a-menu-item key="MetaList">
                <img class="icon top-icon" src="@/assets/list.svg" alt="List Meta Logo" style="margin-right: 5px" />
                查看母本
            </a-menu-item>

            <a-menu-item key="MetaCreate">
                <img class="icon top-icon" src="@/assets/upload2.svg" alt="Upload Meta Logo" style="margin-right: 5px" />
                上传母本
            </a-menu-item>


        </a-menu>
    </a-layout-header>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        const handleMenuClick = (key) => {
            if (key.key === "RabbitMQ") {
                const url = "http://121.199.165.153/rabbitmq/#/";
                window.open(url, "_blank");
            } else {
                const url = router.resolve({
                    name: key.key,
                    // query: { keyword_task_id, clip_url_hash },
                }).href;
                window.open(url, "_blank");
            }
        };

        return {
            handleMenuClick,
        };
    },
});
</script>

<style>
.top-icon {
    width: 16px;
    /* 设置图标的宽度 */
    height: 16px;
    /* 设置图标的高度 */
}
</style>
