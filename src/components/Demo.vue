<template>
    <div>
        <a-pagination v-model:current="offsetPlusOne" show-quick-jumper :total="500" @change="onChange" />
        <br />
        <!-- <a-pagination v-model:current="current2" show-quick-jumper :total="500" disabled show-less-items
            @change="onChange" /> -->
    </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";



const formState = reactive({
    limit: 20,
    offset: 0,
});

const offsetPlusOne = computed(() => {
    //   return formState.value ? formState.value.offset + 1 : 0;
    return formState.value.offset + 1
});

</script>

