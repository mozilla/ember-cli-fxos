module.exports = {
    name: 'ffos-manifest',
    description: 'Blueprint for creating a manifest.webapp for FFOS apps',
    normalizeEntityName: function(entityName) {
      return entityName; // prevents ember-cli from requiring an entity name
    },
    locals: function(options) {
        var project = this.project.pkg;
        return {
          appName: project.name,
          appDescription: project.description || '',
          authorName: project.author || '',
          versionNumber: project.version
        }
    }
};
