module.exports = {
  NoResourcesException: function(options) {
      this.name = "No resources error";
      this.message = "No resources found in the defined resource path: "+options.resourcePath;
    },
  HttpError: function(options){
    this.status = options.status || 400;
    this.message = options.message || "Invalid request";
    this.name = "Jackson HTTP error";
  }
};