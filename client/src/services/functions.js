const addClass = (elem, ...classes) => elem.classList.add(classes);
const removeClass = (elem, ...classes) => elem.classList.remove(classes);
const hasClass = (elem, ...classes) => [...elem.classList].some(v => classes.includes(v));
const uniqueID = () => "_" + Math.floor(Math.random() * Date.now()).toString()
const getElementIndex = (element) => Array.prototype.indexOf.call(element.parentNode.childNodes, element);

const winningCombinations = [
  [[0, 0], [0, 1], [0, 2]], // Row 1
  [[1, 0], [1, 1], [1, 2]], // Row 2
  [[2, 0], [2, 1], [2, 2]], // Row 3
  [[0, 0], [1, 0], [2, 0]], // Column 1
  [[0, 1], [1, 1], [2, 1]], // Column 2
  [[0, 2], [1, 2], [2, 2]], // Column 3
  [[0, 0], [1, 1], [2, 2]], // Diagonal 1
  [[0, 2], [1, 1], [2, 0]]  // Diagonal 2
];

export {
  addClass,
  removeClass,
  hasClass,
  uniqueID,
  getElementIndex,
  winningCombinations
};
