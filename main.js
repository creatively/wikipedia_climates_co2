const log = txt => console.log(txt);

getArrayOfMonthlyMeanTemps = () => {

    const elsArray = (selector, parentElement) => { return parentElement ? Array.from(parentElement.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)) };

    const table = elsArray('.wikitable').filter(
        table => table.textContent.includes('Climate data')
    )[0];

    const rowOfMonthlyMeanTemps = elsArray('th', table).filter(
        rowTh => rowTh.textContent.includes('Daily mean')
    )[0].parentElement;

    const monthlyMeanColumns = elsArray('td', rowOfMonthlyMeanTemps);

    const monthlyMeanTemps = monthlyMeanColumns.map((column, index) => {
        const isTheTotalsColumn = index !== monthlyMeanColumns.length - 1,
            columnText = column.textContent;
            positionOfFirstBracket = columnText.indexOf('(') || columnText.length,
            firstTextPart = columnText.substring(0, positionOfFirstBracket),
            isANumberAndNotTheTotalColumn = !isNaN(firstTextPart) && !isTheTotalsColumn;

        return isANumberAndNotTheTotalColumn ? null : Number(firstTextPart);
    }).filter(monthlyMeanTempValue => monthlyMeanTempValue);

    return monthlyMeanTemps;
}

log(getArrayOfMonthlyMeanTemps());
