export function getTime(unixTime) {
  return new Date(unixTime * 1000);
}

export function createDomElement(tag, attributes = {}, parent = null) {
  const element = document.createElement(tag);
  for (let key in attributes) {
    if (key in element) {
      element[key] = attributes[key];
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  if (parent) parent.appendChild(element);
  return element;
}
