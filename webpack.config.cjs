const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      features: path.resolve(__dirname, "src/features"),
      hooks: path.resolve(__dirname, "src/hooks"),
      ApiContext: path.resolve(__dirname, "src/ApiContext"),
      ErrorBoundary: path.resolve(__dirname, "src/ErrorBoundary"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              // If you still face issues, you can add "@babel/plugin-proposal-private-methods" here, but it should not be needed for React 18.
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};
