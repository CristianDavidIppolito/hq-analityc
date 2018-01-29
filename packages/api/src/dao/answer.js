const DataBase = require('../config/database');
const Util = require('../utils/index');

const dataBaseObject = new DataBase();

/**
 * Function to create a answer
 *
 * @param {Object} answer
 * @return {Promise}
 */
async function createAnswer(answer = null) {
    if(answer === null) throw new Error('The param can be null');

    const keys = ['question_id', 'option', 'date', 'time'];
    const missingKeys = Util.getMissinKeys(keys, answer); 

    if (missingKeys.length > 0) throw new Error(`These keys are missing: ${missingKeys.toString()}`);

    try {
        await dataBaseObject.connect();
    } catch (error) {
        throw error;
    }

    const sSQLC = 'INSERT INTO hq.answers (`question_id`, `option`, `date`, `time`) VALUES(?, ?, ?, ?)';
    const values = [answer.question_id, 
                    answer.option,  
                    answer.date, 
                    answer.time];
    let infoInsert;
    try {
        infoInsert = await dataBaseObject.query(sSQLC, values);
    } catch (error) {
        dataBaseObject.destroy();
        throw error;
    }

    const sSQLR =   'SELECT `id`, ' +
                    '`question_id`, ' +
                    '`option`, ' +
                    '`date`, '+
                    '`time` ' +
                    'FROM hq.answers ' +
                    'WHERE id = ?';
    let instance;
    try {
        instance = await dataBaseObject.query(sSQLR, [infoInsert.insertId]);
        instance = instance[0];
    } catch (error) {
        dataBaseObject.destroy();
        throw error;
    }

    dataBaseObject.destroy();

    return instance;
}

/**
 * Function to get the all answrs
 * 
 * @return {Promise}
 */
async function getAnswers(){
    try {
        await dataBaseObject.connect();
    } catch (error) {
        throw error;
    }

    let rows;
    const sSQL =    'SELECT id, ' +
                    'question_id, '+
                    '`option`, ' +
                    '`date`, ' +
                    '`time` ' +
                    'FROM hq.answers';                                   
    try {
        rows = await dataBaseObject.query(sSQL);
    } catch (error) {
        dataBaseObject.destroy();
        throw error; 
    }

    dataBaseObject.destroy();

    return rows;

}

/**
 * Function to show a answer
 * 
 * @param {Number} [answerId=null] 
 * @return {Promise}
 */
async function showAnswer(answerId = null){
    if (answerId === null) throw new Error('The param cant be null');

    try {
        await dataBaseObject.connect();
    } catch (error) {
        throw error;
    }

    const sSQL =    'SELECT   id, ' +
                    'question_id, ' +
                    '`option`, ' +
                    '`date`, ' + 
                    '`time` ' +
                    'FROM hq.answers '
                    'WHERE id = ?';
    let instance;
    try {
        instance = await dataBaseObject.query(sSQL, [answerId]);
        instance = instance[0];
    } catch (error) {
        dataBaseObject.destroy();
        throw error;
    }

    dataBaseObject.destroy();

    return instance;
}

/**
 * Function to update a answer
 * 
 * @param {Object} answer
 * @param {Number} id
 * @return {Promise}
 */
async function updateAnswer(answer = null, id = null){
    if(answer === null || id === null) throw new Error('The param cant be null');

    const keys = ['question_id', 'option', 'date', 'time'];
    const missingKeys = Util.getMissinKeys(keys, answer); 

    if (missingKeys.length > 0) throw new Error(`These keys are missing: ${missingKeys.toString()}`);

    try {
        await dataBaseObject.connect();
    } catch (error) {
        throw error;
    }

    const sSQLU =   'UPDATE hq.answers ' + 
                    'SET question_id = ?, ' +
                    '`option` = ?, ' + 
                    '`date` = ?, ' +
                    '`time` = ? ' +
                    'WHERE id = ?';
    const values = [answer.question_id, answer.option, answer.date, answer.time, id];
    try {
        await dataBaseObject.query(sSQLU, values);
    } catch (error) {
        dataBaseObject.destroy();
        throw error;
    }
    
    const sSQLR =   'SELECT   id, ' +
                    'question_id, ' +
                    '`option`, ' +
                    '`date`, ' + 
                    '`time` ' +
                    'FROM hq.answers '
                    'WHERE id = ?';
    let instance;
    try {
        instance = await dataBaseObject.query(sSQLR, [id]);
        instance = instance[0];
    } catch (error) {
        dataBaseObject.destroy();
        throw error;
    }

    dataBaseObject.destroy();

    return instance;
}

/**
 * Function to delete a answer
 * 
 * @param {any} [id=null]
 * @return {Promise}
 */
async function deleteAnswer(id = null){
    if(id === null) throw new Error('The param cant be null');

    try {
        await dataBaseObject.connect();
    } catch (error) {
        throw error;
    }

    const sSQLD = 'DELETE FROM  hq.answers WHERE id = ?';
    let deletedInfo;

    try {
        deletedInfo = await dataBaseObject.query(sSQLD, [id]);
    } catch (error) {
        dataBaseObject.destroy();
        throw error;
    }

    dataBaseObject.destroy();

    return deletedInfo.affectedRows;
}

module.exports = {
    createAnswer,
    getAnswers,
    showAnswer,
    updateAnswer,
    deleteAnswer
}