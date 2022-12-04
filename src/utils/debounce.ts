export const debounce = (func: () => {}) => {
  let timer: any;
  return function (...args: any) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};
