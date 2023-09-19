<template>
    <div>
        <a-pagination v-model:current="offsetPlusOne" show-quick-jumper :total="500" @change="onChange" />
        <br />
    </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";



const formState = reactive({
    limit: 20,
    offset: 2,
});

const offsetPlusOne = computed(() => {
    //   return formState.value ? formState.value.offset + 1 : 0;
    return formState.offset + 1
});

</script>

