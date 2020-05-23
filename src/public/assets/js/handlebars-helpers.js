Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => ((arg1 === arg2) ? options.fn(this) : options.inverse(this)));

Handlebars.registerHelper('renderGreeting', () => {
  const hours = moment().format('HH');
  if (hours < 4) {
    return 'Hello, Night Owl';
  }
  if (hours < 11) {
    return 'Good Morning';
  }
  if (hours < 13) {
    return 'En guete';
  }
  if (hours < 17) {
    return 'Good Afternoon';
  }
  if (hours < 22) {
    return 'Good Evening';
  }
  if (hours < 22) {
    return 'Good Night';
  }
  return 'Hello';
});

Handlebars.registerHelper('renderCreatedAt', (createdAt) => {
  const createdAtMoment = moment(createdAt, 'YYYY-MM-DD HH:mm:ss');
  const now = moment();

  const hoursAgo = now.diff(createdAtMoment, 'hours');

  return hoursAgo > 24 ? `Created at ${createdAtMoment.format('DD.MM.YYYY')}` : `Created ${createdAtMoment.fromNow()}`;
});

Handlebars.registerHelper('renderPriority', (priority) => {
  const priorityMap = {
    1: 'High',
    2: 'Medium',
    3: 'Low',
    default: 'Low',
  };

  return priorityMap[priority] || priorityMap.defalt;
});

Handlebars.registerHelper('renderDueDate', (dueDate) => {
  const dueDateMoment = moment(dueDate);
  const now = moment();

  const dayDifference = dueDateMoment.startOf('day').diff(now.startOf('day'), 'days');

  if (dayDifference === 0) {
    return 'Due until today';
  }
  if (dayDifference === 1) {
    return 'Due until tomorrow';
  }
  if (dayDifference === -1) {
    return 'Due until yesterday';
  }

  return `Due until ${dueDateMoment.format('DD.MM.YYYY')}`;
});

Handlebars.registerHelper('renderStatus', (dueDate, isDone) => {
  if (isDone) {
    return new Handlebars.SafeString('<div class="task__status task__status--done">Done</div>');
  }
  const dueDateMoment = moment(dueDate);
  const now = moment();

  const dayDifference = dueDateMoment.startOf('day').diff(now.startOf('day'), 'days');

  if (dayDifference < 0) {
    return new Handlebars.SafeString('<div class="task__status task__status--late">Late</div>');
  }

  return new Handlebars.SafeString('<div class="task__status task__status--open">Open</div>');
});
