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

        const codeOfWierdHyphenThing = 8722;

        const isFareignheight = elsArray('th', table).some(
            rowTh => rowTh.textContent.includes('mean °F')
        ); 

        const cleanAnyWierdHyphens = text => {
            if (text.codePointAt(0) === codeOfWierdHyphenThing) {
                text = '-' + text.substring(1, text.length);
            }
            return text;
        }

        const monthlyMeanColumns = elsArray('td', rowOfMonthlyMeanTemps);

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
        return null;
    }
}

const arrayOfMonthlyMeanTemps = getArrayOfMonthlyMeanTemps();

if (arrayOfMonthlyMeanTemps) {
    const arrayTotal = arr => { 
        let total = 0;
        arr.forEach(item => {
            total += Number(item)
        });
        return total
    }

    const optimumMeanTemp = 17;

    const totalHeatingAndCoolingScore = arrayTotal(
        arrayOfMonthlyMeanTemps.map(
            temp => {
                const x = (optimumMeanTemp - temp);
                return Math.abs(x);
            }
        )
    ).toFixed(1);

    console.log(arrayOfMonthlyMeanTemps);
    console.log('totalHeatingAndCoolingScore = ', totalHeatingAndCoolingScore);
} else {
    // no 'mean' row in table
}


// NEXT : 
// --->> create carbon emissions factor to add in
