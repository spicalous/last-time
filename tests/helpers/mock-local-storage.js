let originalSet;
let originalRemove;
let originalClear;

export default {

  mock() {
    originalSet = window.localStorage.setItem;
    originalRemove = window.localStorage.removeItem;
    originalClear = window.localStorage.clear;
    window.localStorage.setItem = this.setItem.bind(this);
    window.localStorage.removeItem = this.removeItem.bind(this);
    window.localStorage.clear = this.clear.bind(this);
    return this;
  },

  values: {},

  setItem(key, value) {
    this.values[key] = value;
  },

  removeItem(key) {
    delete this.values[key];
  },

  clear() {
    this.values = {};
  },

  restore() {
    window.localStorage.setItem = originalSet;
    window.localStorage.removeItem = originalRemove;
    window.localStorage.clear = originalClear;
  }

};
