import str from './index';

const description = (value) => str(value) && /^[a-zA-Zа-яА-Я 0-9-',!?"()@$:;+=&.%]+$/.test(value) && value.length < 255;

export default description;
