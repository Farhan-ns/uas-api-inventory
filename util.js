const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

var db;

const init = () => {
    db = new JsonDB(new Config("db", true, false, '/'));
}

const requestBodyIsEmpty = ({ body }, res, next) => {
    if (isEmpty(body)) {
        res.status(400).json({
            ok: false,
            message: 'Request body cannot be empty'
        })
    } else next()
}

module.exports = {db, init} 