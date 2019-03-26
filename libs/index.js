import Button from './components/button'
import CheckBox from './components/checkbox'
import Anchor from './components/anchor'
import Icon from './components/icon'
const components = [
    Button,
    Anchor,
    Icon,
    CheckBox
]

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component))
}

const api = {
    install
}
export default api
