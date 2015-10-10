AaasSchemas = new Mongo.Collection('aaas_schemas');

Exposee = {
    'detectCollections': function () {
        // Note: this returns the actual mongo collection name
        var collections = _.map(Mongo.Collection.getAll(), function (collection) {
            return collection.instance;
        });
        return _.without(collections, 'meteor_autoupdate_clientVersions');
    },
    'detectSimpleSchemas': function () {
        var schemas = [];
        for (var k in window) {
            if (window[k] instanceof SimpleSchema) {
                schemas.push(k);
            }
        }
        return schemas;
    },
};

// Write your package code here!
Meteor.startup(function () {
    if (! Meteor.isServer) {
        return ;
    }

    AaasSchemas.remove({});

    var collections = Exposee.detectCollections();

    _.each(collections, function(Collection) {
        var simpleSchema = Collection.simpleSchema();

        if (! simpleSchema) {
            return;
        }

        var get_type = function (val, key) {
            switch (val.type.name) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                    return this[val.type.name];

                case 'Array':
                    return Array;

                case 'Object':
                    if (typeof relations[key] == 'undefined') {
                        return Object;
                    }
                    else {
                        return;
                    }
            }
        }

        var mymain = {};
        var relations = {};

        _.map(simpleSchema._schema, function (val, key) {
            if (/\./.test(key)) {
                var parts = key.split('.');
                var related_key = parts[0];
                var sub_key = parts[1];

                if (typeof relations[related_key] == 'undefined') {
                    relations[related_key] = {};
                }

                if (sub_key == '$') {
                    sub_key = '_dollar';
                }

                relations[related_key][sub_key] = val;
                relations[related_key][sub_key].keyType = val.type.name;
            }
            else {
                mymain[key] = val;
                mymain[key].keyType = val.type.name;

                /*
                 if (typeof mymain[key]['autoValue'] != 'undefined') {
                 if (typeof mymain[key].functions == 'undefined') mymain[key].functions = {};

                 mymain[key].type = 'autovalue';
                 mymain[key].functions['autovalue'] = mymain[key]['autoValue'].toString();
                 }
                 */
            }
        })

        var doc = {
            name: Collection._name,
            main: mymain,
            relations: relations
        };

        AaasSchemas.insert(doc);
    })

});