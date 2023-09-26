<template>
    <div class="comp-container">
        <div class="image-list">
            <template v-for="item in imageList" :key="item">
                <div class="image-item"><img :src="item" alt="" /></div>
            </template>
        </div>
        <div class="btn-container">
            <el-button class="btn-item" @click="() => { initImageList() }">换一批</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const IMAGE_WIDTH = 208
const imageList = ref([])

const initImageList = (num = 6) => {
    imageList.value = []
    for(let i = 1; i <= num; i++) {
        imageList.value.push(`https://picsum.photos/${IMAGE_WIDTH}?random=${(new Date()).getTime() + i}`)
    }
}
initImageList()
</script>
<style lang="scss" scoped>
.comp-container {
    background: #e2e2e3;
    border-radius: 4px;
    .image-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        // padding: 0px 16px 0 16px;
        padding-left: 16px;
        padding-bottom: 16px;
        .image-item {
            width: calc(v-bind(IMAGE_WIDTH) * 1px);
            margin-top: 16px;
            margin-right: 16px;
            img {
                width: calc(v-bind(IMAGE_WIDTH) * 1px);
            }
        }
    }
    .btn-container {
        display: flex;
        line-height: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
    }
}
</style>