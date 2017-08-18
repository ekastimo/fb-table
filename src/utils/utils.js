
export function isDefined(value) {
    return typeof value !== 'undefined';
}

export function printLn(value) {
    console.log(isDefined(value) ? JSON.stringify(value) : value)
}

