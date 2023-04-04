import arr from './arr';
import obj from './obj';

const json = (value) => arr(value) || obj(value);

export default json;
