/*c.js*/
function computeMaxCallStackSize(size) {
  if (size === 10) {
    debugger
  }
  size = size || 1;
  return computeMaxCallStackSize(size + 1);
}

function computeMaxCallStackSize() {
  try {
    return 1 + computeMaxCallStackSize();
  } catch (e) {
    // Call stack overflow
    return 1;
  }
}