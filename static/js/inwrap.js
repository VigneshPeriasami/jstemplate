module = {};
function require(resstr) {
  if (resstr == 'react/addons') {
    return React;
  }
}
