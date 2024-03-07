/** Generic-typed version of `getElementById` */
export function getById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw Error(`Cannot find element with id '${id}'`);
  }
  return element as T;
}

/** Creates an HTML element with the given tag name, properties and (optionally) style */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  properties?: Partial<HTMLElementTagNameMap[K]>,
  style?: Partial<CSSStyleDeclaration>
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (properties !== undefined) {
    Object.assign(element, properties);
  }
  if (style !== undefined) {
    Object.assign(element.style, style);
  }
  return element;
}
