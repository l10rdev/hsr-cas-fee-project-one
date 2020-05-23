
export function compareByDueDate(a, b, comparator = moment) {
  const dateA = comparator(a.dueDate, 'YYYY-MM-DD');
  const dateB = comparator(b.dueDate, 'YYYY-MM-DD');

  const differenceInDays = dateA.diff(dateB, 'days');

  if (differenceInDays !== 0) {
    return differenceInDays;
  }

  return a.priority - b.priority;
}

export function compareByCreationDate(a, b, comparator = moment) {
  const dateA = comparator(a.createdAt, 'YYYY-MM-DD HH:mm:ss');
  const dateB = comparator(b.createdAt, 'YYYY-MM-DD HH:mm:ss');

  const differenceInSeconds = dateB.diff(dateA, 'seconds');

  if (differenceInSeconds !== 0) {
    return differenceInSeconds;
  }

  return compareByDueDate(a, b, comparator);
}

export function compareByPriority(a, b, comparator = moment) {
  const differenceInPriority = a.priority - b.priority;

  if (differenceInPriority !== 0) {
    return differenceInPriority;
  }

  return compareByDueDate(a, b, comparator);
}

export function sortTasks(tasks, orderStrategy, comparator = moment) {
  const orderStrategyMap = {
    creationDate: compareByCreationDate,
    priority: compareByPriority,
    dueDate: compareByDueDate,
  };
  return [...tasks].sort((a, b) => orderStrategyMap[orderStrategy](a, b, comparator));
}
