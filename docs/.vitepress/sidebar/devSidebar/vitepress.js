import { formatRoute } from '../utils'

const NAV_PATH = '/pages/vitepress/'

const routeList = [
    {
        text: 'Vitepress基础配置',
        items: [
            { text: '初始化项目', link: 'install' },
            { text: '配置项目', link: 'configure' }
        ]
    },
    {
        text: 'Vitepress项目部署', link: 'deployment'
    }
]
const defatulSidebar = formatRoute(NAV_PATH, routeList)
export default defatulSidebar