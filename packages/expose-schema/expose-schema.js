AaasSchemas = new Mongo.Collection('aaas_schemas');

// Write your package code here!
Meteor.startup(function () {

    bookingSchema = new SimpleSchema(bookingObject);

    Bookings.attachSchema(bookingSchema);

    var schema = Bookings._c2._simpleSchema._schema;



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

    mymain = {};
    relations = {};

    _.map(schema, function (val, key) {
        if (/\./.test(key)) {
            var parts = key.split('.');
            var related_key = parts[0];
            var sub_key = parts[1];

            if (typeof relations[related_key] == 'undefined') {
                relations[related_key] = {};
            }

            relations[related_key][sub_key] = val;
            relations[related_key][sub_key].type = get_type(val, key);
        }
        else {
            mymain[key] = val;
            mymain[key].type = get_type(val, key);

            /*
             if (typeof mymain[key]['autoValue'] != 'undefined') {
             if (typeof mymain[key].functions == 'undefined') mymain[key].functions = {};

             mymain[key].type = 'autovalue';
             mymain[key].functions['autovalue'] = mymain[key]['autoValue'].toString();
             }
             */
        }
    })

    var add_schema = function (val, key) {
        switch (mymain[key].type.name) {
            case 'String':
                break;

            case 'Array':
                mymain[key].type = [this[val.$.type.name]];
                break;

            case 'Object':
                mymain[key].type = new SimpleSchema(val);
                break;
        }
    }

    _.map(relations, function (val, key) {
        add_schema(val, key);
    })

    console.log(mymain);

    _.map(mymain, function (val, key) {
        console.log(key);
        console.log(val.type);
    })

    NewSchema = new SimpleSchema(mymain);

//Schemas.insert(newschema);

//
//var extr_schema = Schemas.findOne('5Fd6nsevPXZxdbZo9');
//
//var fixedschema = {};
//_.map(extr_schema, function(val, key) {
//  fixedschema[key.replace('_', '.')] = val;
//})
//
//delete(fixedschema['.id']);
//ExtractedBookings = new Mongo.Collection('extractedBookings');
//ExtractedBookings.attachSchema(new SimpleSchema({}));
//ExtractedBookings._c2._simpleSchema._schema = fixedschema;
//
//
//

});