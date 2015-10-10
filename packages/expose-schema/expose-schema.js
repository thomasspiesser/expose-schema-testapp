// Write your package code here!

// test = new Mongo.Collection("test");

Exposee = {
  'detectCollections'() {
    // Note: this returns the actual mongo collection name
    let collections = _.map(Mongo.Collection.getAll(), function(collection) {
      return collection.name;
    });
    return _.without(collections, 'meteor_autoupdate_clientVersions');
  },
  'detectSimpleSchemas'() {
    let schemas = [];
    for (let k in window) {
      if ( window[k] instanceof SimpleSchema ) {
        schemas.push(k);
      }
    }
    return schemas;
  },
};
