import { defineConfig } from 'vitepress'

export default defineConfig({
  // 标题
  title: '学习笔记',
  // 是否启用暗黑模式
  appearance: true,
  // 网站描述
  description: '这是一个学习笔记',
  // 基础路径
  base: '/',
  // <link rel="icon" type="image/svg+xml" href="https://rr-p.oss-cn-shanghai.aliyuncs.com/system-default/system-icon.png">
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://rr-p.oss-cn-shanghai.aliyuncs.com/system-default/system-icon.png'}]
  ],
  themeConfig: {
    // 设置这个后title会使用这个
    siteTitle: '学习笔记',
    logo: {
      src: 'https://rr-p.oss-cn-shanghai.aliyuncs.com/system-default/system-icon.png',
      alt: ''
    },
    nav: [
      { text: '开发工具', link: '/index1'},
      { text: '前端', items: [
          { text: '开发工具', link: '/index1'},
          { text: '开发工具', link: '/index1'}
        ]
      },
      { text: '后端', link: '/index'},
      { text: '数据库', link: '/index'}
    ],
    sidebar: [
      { text: '开发工具', link: '/index1'},
      { text: '前端', items: [
          { text: '开发工具', link: '/index1'},
          { text: '开发工具', link: '/index1'}
        ]
      },
      { text: '后端', link: '/index'},
      { text: '数据库', link: '/index'}
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
