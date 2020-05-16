

export function compareByDueDate(a, b) {
    const dateA = moment(a.dueDate, "DD.MM.YYYY");
    const dateB = moment(b.dueDate, "DD.MM.YYYY");

    const differenceInDays = dateA.diff(dateB, 'days');

    if (differenceInDays !== 0) {
        return differenceInDays;
    }

    return a.priority - b.priority;
}

export function compareByCreationDate(a, b) {
    const dateA = moment(a.createdAt, "DD.MM.YYYY");
    const dateB = moment(b.createdAt, "DD.MM.YYYY");

    const differenceInDays = dateA.diff(dateB, 'days');

    if (differenceInDays !== 0) {
        return differenceInDays;
    }

    return a.priority - b.priority;
}

export function compareByImportance(a, b) {
    const differenceInPriority = a.priority - b.priority

    if (differenceInPriority !== 0) {
        return differenceInPriority;
    }

    const dateA = moment(a.dueDate, "DD.MM.YYYY");
    const dateB = moment(b.dueDate, "DD.MM.YYYY");

    return dateA.diff(dateB, 'days');
}
