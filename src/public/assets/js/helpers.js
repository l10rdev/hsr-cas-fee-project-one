
export function compareByDueDate(a, b) {
  const dateA = moment(a.dueDate, 'YYYY-MM-DD');
  const dateB = moment(b.dueDate, 'YYYY-MM-DD');

  const differenceInDays = dateA.diff(dateB, 'days');

  if (differenceInDays !== 0) {
    return differenceInDays;
  }

  return a.priority - b.priority;
}

export function compareByCreationDate(a, b) {
  const dateA = moment(a.createdAt, 'YYYY-MM-DD');
  const dateB = moment(b.createdAt, 'YYYY-MM-DD');

  const differenceInDays = dateB.diff(dateA, 'days');

  if (differenceInDays !== 0) {
    return differenceInDays;
  }

  return a.priority - b.priority;
}

export function compareByImportance(a, b) {
  const differenceInPriority = a.priority - b.priority;

  if (differenceInPriority !== 0) {
    return differenceInPriority;
  }

  const dateA = moment(a.dueDate, 'DD.MM.YYYY');
  const dateB = moment(b.dueDate, 'DD.MM.YYYY');

  return dateA.diff(dateB, 'days');
}

export function sortTasks(tasks, orderStrategy) {
  const orderStrategyMap = {
    'creation-date': compareByCreationDate,
    importance: compareByImportance,
    'finish-date': compareByDueDate,
  };
  return [...tasks].sort(orderStrategyMap[orderStrategy]);
}
