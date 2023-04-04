import str from './index.js';

const obj = (value) => str(value)
	&& value.indexOf('{"') === 0
	&& value.indexOf('"}') === value.length - 2;

export default obj;
