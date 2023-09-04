---
layout: home

hero:
  image: https://www.github.com/yyx990803.png
  alt: logo image
  name: 只爭朝夕不負韶華
  text: CSDN演示
  tagline: 努力学习的程序猿
  actions:
    - theme: brand
      text: CSDN个人主页
      link: https://blog.csdn.net/qq_45613931
    - theme: alt
      text: VitePress中文网
      link: https://vitejs.cn/vitepress/

features:
  - title: HTML和CSS
    details: HTML和CSS说明。
    link: https://blog.csdn.net/qq_45613931
  - title: JavaScript
    details: JavaScript说明。
  - title: jQuery
    details: jQuery说明。
  - title: Vue
    details: Vue说明。
  - title: React
    details: React说明。
  - title: Webpack和Vite
    details: Webpack和Vite说明。
---

<script setup>
import { VPTeamPage,  VPTeamPageTitle,  VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: '只爭朝夕不負韶華',
    title: '负责人'
  },
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: '只爭朝夕不負韶華',
    title: '负责人'
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      前端参与开发人员
    </template>
    <template #lead>
      CSDN
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    size="small"
    :members="members"
  />
</VPTeamPage>