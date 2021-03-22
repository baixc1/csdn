var A = {
  g(id) {
    return document.getElementById(id);
  },
  css(id, key, value) {
    document.getElementById(id).style[key] = value;
  },
  //...
};
