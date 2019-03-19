import Vue from 'vue'
import Router from 'vue-router'
import menuList from './json/menu.json'

Vue.use(Router)

let routes = []

Object.keys(menuList).forEach((item) => {
    routes = routes.concat(menuList[item])
})
const addRoute = (router) => {
    router.forEach((route) => {
        if (route.items) {
            addRoute(route.items)
            routes = routes.concat(route.items)
        } else {
            route.component = r => require.ensure([], () =>
                r(require(`./documents/basicDocuments/${route.name}.md`)))
        }
    })
}
addRoute(routes)
export default new Router({
    routes
})
