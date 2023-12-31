import fs from 'fs'
import path from 'path'

// Doc目录
const PROJECT_ROOT_PATH = '../../'

// 判断是否是目录
const isDirectory = (rootPath, fileName) => {
    const filePath = path.join(rootPath, fileName)
    const fileStat = fs.statSync(filePath)
    return fileStat.isDirectory()
}

// 解析文件
const formatFile = (rootPath, fileName) => {
    const filePath = path.join(rootPath, fileName)
    const content = fs.readFileSync(filePath, 'utf-8')
    const titleMatch = content.match(/^#\s+(.*)/m)
    return {
        // fileName: fileName.replace('.md', ''),
        isDir: false,
        title: titleMatch ? titleMatch[1] : '未命名'
    }
}
// 解析配置文件
const formtConfigFile = (rootPath, fileName) => {
    const filePath = path.join(rootPath, fileName)
    const content = fs.readFileSync(filePath, 'utf-8')
    return content ? JSON.parse(content) : {}
}
// const initConfigByFileName = (config, fileName) => {
//     const originFileName = fileName.replace('.md', '')
//     config[originFileName] = 
// }

const getFileDirByRoot = (filePath = '') => {
    // 获取目录下的文件
    const rootPath = path.resolve(__dirname, `${PROJECT_ROOT_PATH}${filePath}`)
    // 读取文件
    try {
        const files = fs.readdirSync(rootPath)
        // 获取配置文件
        let config = {}
        if (files.includes('config.json')) {
            config = formtConfigFile(rootPath, 'config.json')
        }
        let formatFiles = []
        files.forEach(fileName => {
            const isDir = isDirectory(rootPath, fileName)
            if (isDir) {
                // 初始化配置文件
                config[fileName] = {
                    title: config[fileName]?.title ?? fileName,
                    sort: config[fileName]?.sort ?? 0
                }
                const childFiles = getFileDirByRoot(`${filePath}/${fileName}`)
                if (childFiles.length) {
                    formatFiles.push({
                        path: `${filePath}/${fileName}`,
                        title: config[fileName]?.title ?? fileName,
                        isDir: true,
                        key: fileName,
                        files: childFiles
                    })
                }
            } else {
                if (fileName.endsWith('.md')) {
                    const info = formatFile(rootPath, fileName)
                    const originFileName = fileName.replace('.md', '')
                    config[originFileName] = {
                        title: config[originFileName]?.title ?? (info.title || originFileName),
                        sort: config[originFileName]?.sort ?? 0
                    }
                    // 初始化配置文件
                    config[originFileName].title && formatFiles.push({
                        ...info,
                        title: config[originFileName].title,
                        key: originFileName,
                        path: `${filePath}/${fileName}`
                    })
                }
            }
        })
        return formatFiles.sort((a, b) => {
            return config[b.key].sort - config[a.key].sort
        })
    } catch (e) {
        console.log(`读取：${filePath} 下的文件发生错误....`)
        return []
    }
}
const renderSiderBar = (siderPaths) => {
    return siderPaths.map((item) => {
        const info = {
            text: item.title, 
            // activeMatch: `/${item.path.replace('.md', '')}`
        }
        if (item.isDir) {
            const arrs = renderSiderBar(item.files)
            info.items = arrs
            info.activeMatch = arrs[0].link || arrs[0].activeMatch
            // info.link = arrs[0].link
        } else {
            info.link = `/${item.path.replace('.md', '')}`
        }
        return info
    })
}
const renderMenu = (menuPaths) => {
    let nav = [], siderBar = {}
    menuPaths.forEach(item => {
        if (item.isDir) {
            let siderBase = renderSiderBar(item.files)
            item.files.forEach(unit => {
                if (unit.files && unit.files.length) {
                    const unitSiderBar = renderSiderBar(unit.files)
                    siderBar[unit.path] = unitSiderBar
                }
            })
            // siderBar[item.path] = siderBase
            // 存在目录
            nav.push({
                text: item.title,
                activeMatch: `/${item.path}`,
                items: item.files.map(unit => {
                    return { text: unit.title, link: siderBase[0].link || siderBase[0].activeMatch, activeMatch: `/${unit.path.replace('.md', '')}`}
                })
            })
        } else {
            nav.push({ text: item.title, link: `/${item.path.replace('.md', '')}`, activeMatch: `/${item.path.replace('.md', '')}` })
        }
    })
    // console.log('dddddddddddd', JSON.stringify(nav))
    return {
        nav,
        siderBar
    }
}
const menuPaths = getFileDirByRoot('pages')
const { nav, siderBar } = renderMenu(menuPaths)

// console.log('menuPaths....', JSON.parse(JSON.stringify(menuPaths)))
export default {
    nav,
    siderBar
}