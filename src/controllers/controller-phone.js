
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const { v4: uuidv4 } = require('uuid');

var db = new JsonDB(new Config("db", true, false, '/'));
const path = '/phones'
const validationProps = [
    'name',
    'brand',
    'imei',
    'production_date'
]

const getPhone = (req, res) => {
    const data = db.getData('/')
    res.status(200).json({ data })
}

const getPhoneById = (req, res) => {
    const { id } = req.params
    try {
        const data = db.getData(`${path}/${id}`)
        res.json({ ...data })
    } catch (e) {
        res.status(404).json({
            message: 'Error, cannot find data with such id'
        })
    }
}

const postPhone = (req, res) => {
    const uuid = uuidv4()
    const { body } = req
    const id = uuidv4();
    // const { name, brand, imei, production_date: productionDate } = req.body

    db.push(`${path}/${id}`, {
        id,
        ...body
    })
    if (Object.keys(body).length === 0) {
        res.status(400).json({
            message: 'No body included'
        })
    } 
    // let errors = {};
    // validationProps.forEach(element => {

    //     if (!body.hasOwnProperty(element)) {
    //         errpr
    //     }
    // });
    res.status(201).json({
        id,
        ...body
    })
}
const putPhoneById = (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const sourceData = db.getData(`${path}/${id}`)
        const modifiedData = Object.assign(sourceData, data)
        db.push(`${path}/${id}`, {
            ...modifiedData
        })
        res.json(modifiedData)
    } catch (e) {
        res.status(404).json({
            message: 'Error, cannot find data with such id'
        })
    }
}

const deletePhoneById = (req, res) => {
    const { id } = req.params
    try {
        const data = db.getData(`${path}/${id}`)
        db.delete(`${path}/${id}`)
        res.json(data)
    } catch (e) {
        res.status(404).json({
            message: 'Error, cannot find data with such id'
        })
    }
}

module.exports = {
    getPhone,
    getPhoneById,
    postPhone,
    putPhoneById,
    deletePhoneById
}
