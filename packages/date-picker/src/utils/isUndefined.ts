const isUndefined = (maybeUndefined: any): maybeUndefined is undefined => typeof maybeUndefined === 'undefined';

export default isUndefined;
