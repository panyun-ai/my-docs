const initRouteList = (path, list) => {
    return list.map(item => {
        if (item.link) {
            item.link = `${path}${item.link}`
        }
        if (item.items && item.items.length) {
            item.items = initRouteList(path, item.items)
        }
        return item
    })
}

export const formatRoute = (navPath, routeList) => {
    const siderBarList = initRouteList(navPath, routeList)
    return {
        navPath,
        siderBarList
    }
}

export const getNavLink = (siderBarList) => {
    if (siderBarList && siderBarList.length) {
      if (siderBarList[0].link) {
        return siderBarList[0].link
      } else if (siderBarList[0].items && siderBarList[0].items.length) {
        return getNavLink(siderBarList[0].items)
      } else {
        return '/index'
      }
    }
    return '/index'
}
