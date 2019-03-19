import Button from './components/button'
const components = [
    Button
]

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component))
}

const api = {
    install
}
export default api
