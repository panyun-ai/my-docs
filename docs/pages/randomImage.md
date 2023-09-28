# 随机图片

> 通过访问一个固定的网络地址，可以随机获取一张不同的图片，可用于构建静态页面

## 使用说明
- [官方文档地址](https://picsum.photos/)
- 通过设置宽高可以获得 `指定宽高` 的图片:
  - [https://picsum.photos/200/300](https://picsum.photos/200/300) - 宽200 高300 的图片
  - [https://picsum.photos/200](https://picsum.photos/200/300) - 宽200 高200 的图片
- 控制生成不同的 `图片格式`：支持.jpg/.webp
  - [https://picsum.photos/200/300.jpg](https://picsum.photos/200/300.jpg)
  - [https://picsum.photos/200/300.webp](https://picsum.photos/200/300.webp)
- 设置图片的 `灰度` 和 `模糊`
  - [https://picsum.photos/id/870/200/300?grayscale&blur=2](https://picsum.photos/id/870/200/300?grayscale&blur=2)
- 随机生成多张相同参数的图片
  - [https://picsum.photos/200/300?random=1](https://picsum.photos/200/300?random=1)

## 使用案例

<RandomImage />
<script setup>
import RandomImage from '@/components/toolComp/RandomImage.vue'
</script>