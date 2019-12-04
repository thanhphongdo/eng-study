const Parse = require('parse');
Parse.initialize("rMieJ8Gk4toTf0z9Shs8rxbwT3Aj0jvS8t9o0bPp", "Qx6IEhH6MV7iUaMV3ySED7NLgwy09zvd3pysR1ay");
Parse.serverURL = 'https://parseapi.back4app.com/';
// const Parse = {};
export default class ParseService {
    Parse = Parse;
    init() {
        console.log(Parse);
    }
    createQuery(className) {
        return new Parse.Query(className);
    }
    toJSON(pObj) {
        if (pObj) {
            let className = pObj.className;
            pObj = pObj.toJSON();
            pObj.className = className;
            return pObj;
        }
        return null;
    }
    fromJSON(obj) {
        return Parse.Object.fromJSON(obj);
    }
    find(className, queryFunc) {
        let query = new Parse.Query(className);
        query = queryFunc(query);
        return query.find({ useMasterKey: true });
    }
    create(className, obj, widthoutSave) {
        const ParseObj = Parse.Object.extend(className);
        let parseObj = new ParseObj();
        let objKey = Object.keys(obj);
        objKey.forEach(key => {
            parseObj.set(key, obj[key]);
        });
        if (widthoutSave) {
            return parseObj;
        }
        return parseObj.save({ useMasterKey: true });
    }
    update(currentObj, obj, widthoutSave) {
        let objKey = Object.keys(obj);
        objKey.forEach(key => {
            parseObj.set(key, obj[key]);
        });
        if (widthoutSave) {
            return parseObj;
        }
        return parseObj.save({ useMasterKey: true });
    }
    destroy(obj) {
        return parseObj.destroy({ useMasterKey: true });
    }
    saveAll(objs) {
        return Parse.Object.saveAll(objs, { useMasterKey: true });
    }
    destroyAll(objs) {
        return Parse.Object.destroyAll(objs, { useMasterKey: true });
    }
}