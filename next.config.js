const webpack = require("webpack")
const withImages = require("next-images")
const withCSS = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")
const withComposePlugins = require("next-compose-plugins")

const nextConfig = {
  distDir: "build",
  serverRuntimeConfig: {
    // Will only be available on the server side
    API_HOST_ON_SERVER: process.env.API_HOST
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_HOST: process.env.API_HOST
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000
        }
      }
    })

    return config
  }
}

module.exports =
  withComposePlugins(
    [
      withCSS,
      withSass,
    ],
  nextConfig)
