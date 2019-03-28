import Button from './components/button';
import Anchor from './components/anchor';
import CheckBox from './components/checkbox';
import Radio from './components/radio';
import Icon from './components/icon';
import Input from './components/input';
import Color from './components/color';
const components = [
    Button,
    Anchor,
    Radio,
    Icon,
    Input,
    Color,
    CheckBox
];

const install = function (Vue) {
    components.forEach(component => Vue.component(component.name, component));
};

const api = {
    install
};
export default api;
