// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add a resolver alias so any `import 'ws'` gets the empty shim
config.resolver.extraNodeModules = {
	...(config.resolver.extraNodeModules || {}),
	ws: require.resolve("./shims/empty.js"),
};
config.resolver.unstable_enablePackageExports = false;
module.exports = config;
