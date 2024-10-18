const path = require("path");

module.exports = {
  entry: "./telemetric.js",
  output: {
    filename: "telemetric.bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "Telemetric",
    libraryTarget: "umd", // Use UMD to support various module systems
    globalObject: "this", // Ensure the global object is correctly referenced
  },
  mode: "production",
};
