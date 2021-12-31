// ------ THESE TWO METHODS ARE EXTRACTED OUT FROM THEIR USE IN THE CODE ------ 
// ------ AS THEY"RE QUITE GENERIC AND COULD BE USED AGAIN ------ 


// GETS AN ARRAY FROM AN HTML ELEMENTS SELECTOR, 
// AND MAKES EXTRA ARRAY METHODS AVAIABLE BY CONVERTING THE ELEMENTS ARRAY OBJECT INTO A NORMAL ARRAY OBJECT
const elsArray = (selector, parentElement) => { return parentElement ? Array.from(parentElement.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)) };


// GETS A TOTAL OF ALL THE NUMBERS IN AN ARRAY
const arrayTotal = arr => { let total = 0; arr.forEach(item => {total += Number(item)}); return total}
