import filled from './filled.js';

const envKey = (value) => filled(value) && value.length < 127 && /^[A-Z0-1_]+$/.test(value);

export default envKey;
