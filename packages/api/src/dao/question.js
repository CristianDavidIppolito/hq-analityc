const DataBase = require('../config/database');
const Util = require('../utils/index');

const dataBaseObject = new DataBase();

/**
 * Function to create a question
 *
 * @param {Object} question
 * @return {Promise}
 */
async function createQuestion(question = null) {
  if (question === null) throw new Error('The param can be null');

  const keys = ['description'];
  const missingKeys = Util.getMissinKeys(keys, question);

  if (missingKeys.length > 0) throw new Error(`These keys are missing: ${missingKeys.toString()}`);

  try {
    await dataBaseObject.connect();
  } catch (error) {
    throw error;
  }

  const sSQLC = 'INSERT INTO hq.questions (description) VALUES(?)';
  const values = [question.description];
  let infoInsert;
  try {
    infoInsert = await dataBaseObject.query(sSQLC, values);
  } catch (error) {
    dataBaseObject.destroy();
    throw error;
  }

  const sSQLR = `SELECT   id, 
                            description 
                    FROM hq.questions 
                    WHERE id = ?`;
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
 * Function to get the all questions
 *
 * @return {Promise}
 */
async function getQuestions() {
  try {
    await dataBaseObject.connect();
  } catch (error) {
    throw error;
  }

  let rows;
  const sSQL = 'SELECT id, ' + 'description ' + 'FROM hq.questions';
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
 * Function to show a question
 *
 * @param {Number} [questionId=null]
 * @return {Promise}
 */
async function showQuestion(questionId = null) {
  if (questionId === null) throw new Error('The param can be null');

  try {
    await dataBaseObject.connect();
  } catch (error) {
    throw error;
  }

  const sSQL = `SELECT   id, 
                            description 
                    FROM hq.questions 
                    WHERE id = ?`;
  let instance;
  try {
    instance = await dataBaseObject.query(sSQL, [questionId]);
    instance = instance[0];
  } catch (error) {
    dataBaseObject.destroy();
    throw error;
  }

  dataBaseObject.destroy();

  return instance;
}

/**
 * Function to update a question
 *
 * @param {Object} question
 * @param {Number} id
 * @return {Promise}
 */
async function updateQuestion(question = null, id = null) {
  if (question === null || id === null) throw new Error('The param can be null');

  const keys = ['description'];
  const missingKeys = Util.getMissinKeys(keys, question);

  if (missingKeys.length > 0) throw new Error(`These keys are missing: ${missingKeys.toString()}`);

  try {
    await dataBaseObject.connect();
  } catch (error) {
    throw error;
  }

  const sSQLU = 'UPDATE hq.questions SET description = ? WHERE id = ?';
  const values = [question.description, id];
  try {
    await dataBaseObject.query(sSQLU, values);
  } catch (error) {
    dataBaseObject.destroy();
    throw error;
  }

  const sSQLR = `SELECT   id, 
                            description 
                    FROM hq.questions 
                    WHERE id = ?`;
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
 * Function to delete a question
 *
 * @param {any} [id=null]
 * @return {Promise}
 */
async function deleteQuestion(id = null) {
  if (id === null) throw new Error('The param can be null');

  try {
    await dataBaseObject.connect();
  } catch (error) {
    throw error;
  }
  const sSQLD = 'DELETE FROM  hq.questions WHERE id = ?';
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
  createQuestion,
  getQuestions,
  showQuestion,
  updateQuestion,
  deleteQuestion
};
