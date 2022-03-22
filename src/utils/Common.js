import { format, intervalToDuration, parseISO } from "date-fns";
import { airports } from "../Data";


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