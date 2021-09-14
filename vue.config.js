module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_mixins.scss";
          @import "@/styles/_variables.scss";
        `
      }
    }
  }
};