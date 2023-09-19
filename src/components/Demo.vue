<template>
    <div>
        <a-pagination v-model:current="current1" show-quick-jumper :total="500" @change="onChange" />
        <br />
        <!-- <a-pagination v-model:current="current2" show-quick-jumper :total="500" disabled show-less-items
            @change="onChange" /> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';


const current1 = ref(1);
const current2 = ref(2);
const onChange = pageNumber => {
    console.log('Page: ', pageNumber);
};
</script>