/**
 * @param {uuid} id
 * @param {string} answer
 * @param {boolean} isCorrect
 * @param {number} fromLevel
 * @param {number} toLevel
 * @param {boolean} direction
 * @constructor
 */
function Answer(id, answer, isCorrect, fromLevel, toLevel, direction) {

  /** @type {uuid} */
  this.id = id;

  /** @type {string} */
  this.answer = answer;

  /** @type {boolean} */
  this.correct = isCorrect;

  /** @type {number} */
  this.fromLevel = fromLevel;

  /** @type {number} */
  this.toLevel = toLevel;

  /** @type {boolean} */
  this.direction = direction;

  /** @type {date} */
  this.created = new Date();
}