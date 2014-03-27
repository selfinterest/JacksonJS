module.exports = {
  NoResourcesException: function(options) {
    return {
      name: "No resources error",
      message: "No resources found in the defined resource path: "+options.resourcePath
    }
  }
}