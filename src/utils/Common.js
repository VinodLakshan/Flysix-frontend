import { format, intervalToDuration, parseISO } from "date-fns";
import { saveAs } from "file-saver";
import { airports } from "../Data";
import * as XLSX from 'xlsx-js-style';


export const getSliderMarks = (from, to) => {
    const marks = [];

    for (let index = from; index <= to; index++) {
        marks.push({
            value: index,
            label: index.toString()
        })

    }

    return marks;

}

export const formateDateToSimpleDate = (date) => {
    return format(date, "yyyy-MM-dd");
}

export const formatStringToDate = (date, StringFormat) => {
    return format(parseISO(date), StringFormat);
}

export const formatDateToDate = (date, StringFormat) => {
    return format(new Date(date), StringFormat);
}


export const codeToAirportName = (code) => {
    const found = airports.filter(airport => airport.id === code)[0]
    if (found) return found
    return `Somewhere (${code})`
}

export const getPTDuration = (duration) => {
    const hoursMins = duration.split('H')
    const hours = hoursMins[0].split('T')[1];

    return `${hours}hr ${hoursMins[1].toLowerCase()}`
}

export const getTimeDuration = (from, to) => {

    const duration = intervalToDuration({
        start: parseISO(from),
        end: parseISO(to)
    })

    return `${duration.hours}hr ${duration.minutes}m`
}

export const getHourNumberFromDuration = (duration) => {
    return Number(duration.split('h')[0])
}

export const writeToExcel = async (headers, data) => {

    const sheetData = getSheetData(headers, data);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    setSheetStyles(ws, sheetData);

    XLSX.utils.book_append_sheet(wb, ws, "My_Reservations");
    XLSX.writeFile(wb, "Reservations.xlsx")

}

const getSheetData = (headers, data) => {

    const fields = Object.keys(data[0]);
    const sheetData = data.map(row => {
        return fields.map(fieldName => {
            return row[fieldName] ? row[fieldName] : "";
        });
    });

    sheetData.unshift(headers);
    return sheetData;
}

const setSheetStyles = (ws, data) => {

    const cols = [];

    // headers
    for (let i in data[0]) {

        const col = XLSX.utils.encode_col(i);

        ws[col + 1].s = {
            font: {
                bold: true,
                color: { rgb: "FFFFFF" },
            },
            fill: {
                patternType: "solid",
                fgColor: { rgb: "00AB55" }
            },
            alignment: {
                vertical: "center",
                horizontal: "center"
            }
        };

        // col width
        cols.push({ wch: 25 })
    }

    // data
    for (let i = 1; i < data.length; i++) {

        const row = XLSX.utils.encode_row(i);

        for (let j in data[i]) {

            const col = XLSX.utils.encode_col(j);

            ws[col + row].s = {
                alignment: {
                    vertical: "center",
                    horizontal: "center"
                }
            };
        }

    }

    ws['!cols'] = cols;
}