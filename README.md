### Creando un proyecto en node

En consola escribimos:

```bash
npm init
```

Añadimos las dependencias de desarrollo

```bash
npm i webpack webpack-cli -D
```

Agregamos al archivo `package.json` el siguiente script

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

**_Configuración de webpack_**

- Creamos el archivo `webpack.config.js` y le agregamos lo siguiente:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};
```

- Ademas debemos de agregar las dependencias:

```bash
npm i -D html-loader html-webpack-plugin
```

**_Servidor de desarrollo de webpack_**

- Debemos de agregar las dependencias:

```bash
npm i -D webpack-dev-server
```

- Ahora agregamos script al archivo `package.json`

```json
"start": "webpack-dev-server --open --port=8081"
```

**_Usando css con webpack_**

- Debemos de agregar las dependencias:

```bash
npm i -D css-loader style-loader
```

- Ahora nos vamos al archivo `componentes.js` e importamos ahi nuestro `css`

```javascript
import "../css/componentes.css";
```

- Siguiente configuramos `webpack.config.js` y agregamos una rule

```javascript
{
  test: /\.css$/,
  use: ["style-loader","css-loader"],
}
```

**_Archivo global css con webpack_**

- Debemos de agregar las dependencias:

```bash
npm i -D mini-css-extract-plugin
```

- Siguiente configuramos `webpack.config.js`

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].[contentHash].css",
      filename: "[name].css",
      ignoreOrder: false,
    }),
  ],
};
```

**_Minimizar css global en producción_**

- Debemos de agregar las dependencias:

```bash
npm i -D optimize-css-assets-webpack-plugin
```

- Siguiente configuramos `webpack.config.js`

Nota: El minimizado de css global solo funcionara si el mode es production

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  // mode: "development",
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].[contentHash].css",
      filename: "[name].css",
      ignoreOrder: false,
    }),
  ],
};
```

**_Trabajando con imágenes_**

- Debemos de agregar las dependencias:

```bash
npm i -D file-loader copy-webpack-plugin
```

- Siguiente configuramos `webpack.config.js`

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  // mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false,
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].[contentHash].css",
      filename: "[name].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
  ],
};
```

**_Modo de producción_**

Creamos el archivo `webpack.prod.js` con el siguiente código:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  output: {
    filename: "main.[contentHash].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false,
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
  ],
};
```

Cambiamos un script del archivo `package.json`

```json
"build": "webpack --config webpack.prod.js",
"dev": "webpack --config webpack.config.js",
```

**_Uso de babel_**

- Debemos de agregar las dependencias:

```bash
# Para babel
npm i -D babel-loader @babel/core
# Para minificar el js
npm i -D babel-preset-minify
# Esta dependencia es para minificar el código exportado
npm i -D babel-minify-webpack-plugin
# Para transformar el código js a uno aceptado.
npm i -D @babel/preset-env
# Eliminar la carpeta dist automáticamente
npm i -D clean-webpack-plugin
```

En el archivo `webpack.prod.js` agregamos el siguiente código:

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  output: {
    filename: "main.[contentHash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false,
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
    new MinifyPlugin(),
    new CleanWebpackPlugin(),
  ],
};
```
