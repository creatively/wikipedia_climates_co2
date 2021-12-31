const degreeDaysToCO2Factor = 35;
const optimumMeanTemp = 18;

const arrayOfElements = (selector, parentElement) => { return parentElement ? Array.from(parentElement.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)) };

const table = arrayOfElements('.wikitable').filter(
    table => table.textContent.includes('Climate data')
)[0];

const arrayOfMonthlyMeanTemps = (() => {

    const meanTempsHeading = arrayOfElements('th', table).filter(
        rowTh => rowTh.textContent.includes('Daily mean')
    )[0] || null;

    if (meanTempsHeading) {
        const rowOfMonthlyMeanTemps = meanTempsHeading.parentElement;

        const isFareignheight = arrayOfElements('th', table).some(
            rowTh => rowTh.textContent.includes('mean °F')
        ); 

        const cleanAnyWierdHyphens = text => {
            const charCodeOfWierdHyphenThing = 8722;
            if (text.codePointAt(0) === charCodeOfWierdHyphenThing) {
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

        return monthlyMeanTempsAllAsCentrigrade;
    }
})();

if (arrayOfMonthlyMeanTemps) {
    const totalScore = (() => {
        const arrayTotal = arr => arr.reduce((a, b) => a + b, 0);
        const getHeatingCoolingScoreForMonth = meanTemperatureForMonth => Math.abs(optimumMeanTemp - meanTemperatureForMonth);
        const arrayOfMonthlyScores = arrayOfMonthlyMeanTemps.map(getHeatingCoolingScoreForMonth);

        return arrayTotal(arrayOfMonthlyScores).toFixed(1);
    })();

    const estimatedHeatingCoolingCarbonEmissionsPerYear = (() => {
        return totalScore ? (totalScore / degreeDaysToCO2Factor).toFixed(1) : null;
    })();

    const rowNumberForText = table.getElementsByTagName("tr").length - 1;
    const newTableRow = table.insertRow(rowNumberForText);
    newTableRow.innerHTML = '<td colspan="14">' +
        'The estimated CO2 emission from household heating and air-con in this location is ' +
            estimatedHeatingCoolingCarbonEmissionsPerYear + 
        ' tonnes/year</td>';
}
