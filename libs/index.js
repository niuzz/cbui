import Button from './components/button'
import Anchor from './components/anchor'
const components = [
    Button,
    Anchor
]

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component))
}

const api = {
    install
}
export default api
