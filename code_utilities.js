const el = (selector, parentElement) => { return parentElement ? parentElement.querySelector(selector) : document.querySelector(selector) };
const els = (selector, parentElement) => { return parentElement ? parentElement.querySelectorAll(selector) : document.querySelectorAll(selector) };
const elsArray = (selector, parentElement) => { return parentElement ? Array.from(parentElement.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)) };
const arrayTotal = arr => { let total = 0; arr.forEach(item => {total += Number(item)}); return total}
