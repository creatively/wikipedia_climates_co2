const log = txt => console.log(txt);

getArrayOfMonthlyMeanTemps = () => {

    const elsArray = (selector, parentElement) => { return parentElement ? Array.from(parentElement.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)) };

    const table = elsArray('.wikitable').filter(
        table => table.textContent.includes('Climate data')
    )[0];

    const meanTempsHeading = elsArray('th', table).filter(
        rowTh => rowTh.textContent.includes('Daily mean')
    )[0] || null;

    if (meanTempsHeading) {
        const rowOfMonthlyMeanTemps = meanTempsHeading.parentElement;

        const isFareignheight = elsArray('th', table).filter(
            rowTh => rowTh.textContent.includes('mean °F')
        ).length > 0; 
        const monthlyMeanColumns = elsArray('td', rowOfMonthlyMeanTemps);

        const convertFtoC = (f) => ((f - 32) * 5 / 9).toFixed(1);

        const monthlyMeanTemps = monthlyMeanColumns.map((column, index) => {
            const isntTheTotalsColumn = index !== monthlyMeanColumns.length - 1,
                columnText = column.textContent,
                positionOfFirstBracket = columnText.indexOf('(') || columnText.length,
                firstTextPart = columnText.substring(0, positionOfFirstBracket),
                isANumber = Number(firstTextPart) !== 'NaN';

            return isANumber && isntTheTotalsColumn ? Number(firstTextPart) : null;
        }).filter(monthlyMean => monthlyMean !== null);

        const monthlyMeanTempsAllAsCentrigrade = isFareignheight 
            ? monthlyMeanTemps.map(convertFtoC) 
            : monthlyMeanTemps;
        
        return monthlyMeanTempsAllAsCentrigrade
    } else {
        return null;
    }
}

log('getArrayOfMonthlyMeanTemps ...');
log(getArrayOfMonthlyMeanTemps());

