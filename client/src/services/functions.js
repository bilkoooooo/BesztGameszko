const addClass = (elem, ...classes) => elem.classList.add(classes);
const removeClass = (elem, ...classes) => elem.classList.remove(classes);
const hasClass = (elem, ...classes) => [...elem.classList].some(v => classes.includes(v));
const uniqueID = () => "_" + Math.floor(Math.random() * Date.now()).toString()
const getElementIndex = (element) => Array.prototype.indexOf.call(element.parentNode.childNodes, element);

export {
  addClass,
  removeClass,
  hasClass,
  uniqueID,
  getElementIndex
};
