import Button from './components/button';
import Anchor from './components/anchor';
import Radio from './components/radio';
import Icon from './components/icon';
import Input from './components/input';
const components = [
    Button,
    Anchor,
    Radio,
    Icon,
    Input
];

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component));
};

const api = {
    install
};
export default api;
