const pathToRegexp = require('path-to-regexp');

// Monkey patch the path-to-regexp library
const originalPathToRegexp = pathToRegexp.pathToRegexp || pathToRegexp;

// Replace the original function with our patched version
if (typeof pathToRegexp.pathToRegexp === 'function') {
  pathToRegexp.pathToRegexp = function(path, keys, options) {
    // Check if the path is a URL and extract just the pathname if it is
    if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
      try {
        const url = new URL(path);
        const originalPath = path;
        path = url.pathname;
        console.warn(`Warning: URL detected in route path. Converting '${originalPath}' to pathname '${path}'`);
      } catch (e) {
        // Not a valid URL, continue with original path
      }
    }
    return originalPathToRegexp(path, keys, options);
  };
} else {
  // For newer versions of path-to-regexp that don't have a pathToRegexp property
  const originalFn = pathToRegexp;
  module.exports = function(path, keys, options) {
    // Check if the path is a URL and extract just the pathname if it is
    if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
      try {
        const url = new URL(path);
        const originalPath = path;
        path = url.pathname;
        console.warn(`Warning: URL detected in route path. Converting '${originalPath}' to pathname '${path}'`);
      } catch (e) {
        // Not a valid URL, continue with original path
      }
    }
    return originalFn(path, keys, options);
  };
  // Copy all properties from the original module
  Object.assign(module.exports, pathToRegexp);
}

console.log('Path-to-regexp patched successfully');
