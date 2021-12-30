const arrayOfMonthlyMeanTemps = (() => {

    const arrayOfElements = (selector, parentElement) => { return parentElement ? Array.from(parentElement.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)) };

    const table = arrayOfElements('.wikitable').filter(
        table => table.textContent.includes('Climate data')
    )[0];

    const meanTempsHeading = arrayOfElements('th', table).filter(
        rowTh => rowTh.textContent.includes('Daily mean')
    )[0] || null;

    if (meanTempsHeading) {
        const rowOfMonthlyMeanTemps = meanTempsHeading.parentElement;

        const isFareignheight = arrayOfElements('th', table).some(
            rowTh => rowTh.textContent.includes('mean °F')
        ); 

        const cleanAnyWierdHyphens = text => {
            const codeOfWierdHyphenThing = 8722;
            if (text.codePointAt(0) === codeOfWierdHyphenThing) {
                text = '-' + text.substring(1, text.length);
            }
            return text;
        }

        const monthlyMeanColumns = arrayOfElements('td', rowOfMonthlyMeanTemps);

        const extractMonthlyTemperaturesIntoArray = (column, index) => {
            const isntTheTotalsColumn = index !== monthlyMeanColumns.length - 1,
                columnText = column.textContent,
                positionOfFirstBracket = columnText.indexOf('(') || columnText.length,
                extractedTextContent = columnText.substring(0, positionOfFirstBracket),
                temperatureText = cleanAnyWierdHyphens(extractedTextContent);

            return isntTheTotalsColumn ? temperatureText : null;
        }

        const convertFtoC = (f) => ((f - 32) * 5 / 9).toFixed(1);

        const monthlyMeanTemps = monthlyMeanColumns.map(extractMonthlyTemperaturesIntoArray)
                                                    .filter(item => item);

        const monthlyMeanTempsAllAsCentrigrade = isFareignheight 
            ? monthlyMeanTemps.map(convertFtoC) 
            : monthlyMeanTemps;

        return monthlyMeanTempsAllAsCentrigrade
    } else {
        // no 'mean' row in table
        return null;
    }
})();

console.log(arrayOfMonthlyMeanTemps);

const getTotalScore = () => {
    const optimumMeanTemp = 18,
        arrayTotal = arr => arr.reduce((a, b) => a + b, 0),
        getHeatingCoolingScoreForMonth = meanTemperatureForMonth => Math.abs(optimumMeanTemp - meanTemperatureForMonth),
        arrayOfMonthlyScores = arrayOfMonthlyMeanTemps.map(getHeatingCoolingScoreForMonth);

    return arrayTotal(arrayOfMonthlyScores).toFixed(1);
}

const totalScore = arrayOfMonthlyMeanTemps ? getTotalScore() : null;

console.log('totalScore = ', totalScore);

const estimatedHeatingCoolingCarbonEmissionsPerYear = ((totalScore) => {
    
})();

// NEXT : 
// --->> create carbon emissions formula
