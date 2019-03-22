
import Button from './components/button';
import Anchor from './components/anchor';
import Radio from './components/radio';
const components = [
    Button,
    Anchor,
    Radio
];


const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component));
};

const api = {
    install
};
export default api;
