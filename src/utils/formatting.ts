export function formatDate(date: Date, withTime = true): string {
    let output = `${
        date.getUTCFullYear()
    }/${
        String(date.getUTCMonth() + 1).padStart(2, '0')
    }/${
        String(date.getUTCDate()).padStart(2, '0')
    }`

    if (withTime) {
        output += ` ${date.getUTCHours()}:${date.getUTCMinutes()}`
    }
    return output
}

export function limitLength(text: string, maxLength = 2000): string {
    if (text.length < maxLength) return text

    return text.slice(0, maxLength - 4) + ' ...'
}
