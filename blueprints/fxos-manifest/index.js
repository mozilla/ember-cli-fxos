module.exports = {
    name: 'fxos-manifest',
    description: 'Blueprint for creating a manifest.webapp for FxOS apps',
    normalizeEntityName: function(entityName) {
        return entityName; // prevents ember-cli from requiring an entity name
    }
};
