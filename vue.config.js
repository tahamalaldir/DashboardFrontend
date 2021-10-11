module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "https://localhost:44379/",
  },
};
