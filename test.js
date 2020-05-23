/*const test = require('ava');
const helpers = require ('./src/public/assets/js/helpers.js');*/
import test from 'ava';
import {compareByCreationDate, compareByDueDate, compareByPriority, sortTasks} from "./src/public/assets/js/helpers";
import moment from 'moment';


test('compareByDueDate with different Date', t => {
  const dataA = {
    dueDate: '2020-02-02',
  };

  const dateB = {
    dueDate: '2020-02-03',
  };

  t.is(compareByDueDate(dataA, dateB, moment), -1);
});

test('compareByDueDate with same Date', t => {
  const dataA = {
    dueDate: '2020-02-02',
    priority: 1,
  };

  const dateB = {
    dueDate: '2020-02-02',
    priority: 3
  };

  t.is(compareByDueDate(dataA, dateB, moment), -2);
});



test('compareByCreationDate with different Time', t => {
  const dataA = {
    createdAt: '2020-02-02 13:00:00',
  };

  const dateB = {
    createdAt: '2020-02-02 14:00:00',
  };

  t.is(compareByCreationDate(dataA, dateB, moment), 3600);
});

test('compareByCreationDate with same Time', t => {
  const dataA = {
    createdAt: '2020-02-02 13:00:00',
    dueDate: '2020-02-03',
  };

  const dateB = {
    createdAt: '2020-02-02 13:00:00',
    dueDate: '2020-02-04'
  };

  t.is(compareByCreationDate(dataA, dateB, moment), -1);
});

test('compareByPriority with different value', t => {
  const taskA = {
    priority: 1,
  };

  const taskB = {
    priority: 2,
  };

  t.is(compareByPriority(taskA, taskB, moment), -1);
});

test('compareByPriority with different same value', t => {
  const taskA = {
    priority: 1,
    dueDate: '2020-02-04'
  };

  const taskB = {
    priority: 1,
    dueDate: '2020-02-05'
  };

  t.is(compareByPriority(taskA, taskB, moment), -1);
});

const tasks = [
  {
    priority: 1,
    dueDate: '2020-02-04',
    createdAt: '2020-02-02 13:00:00',
  },
  {
    priority: 1,
    dueDate: '2020-02-05',
    createdAt: '2020-02-03 13:00:00',
  },
  {
    priority: 1,
    dueDate: '2020-02-06',
    createdAt: '2020-02-04 13:00:00',
  },
  {
    priority: 2,
    dueDate: '2020-02-04',
    createdAt: '2020-02-02 13:00:00',
  },
  {
    priority: 2,
    dueDate: '2020-02-05',
    createdAt: '2020-02-03 13:00:00',
  },
  {
    priority: 2,
    dueDate: '2020-02-06',
    createdAt: '2020-02-04 13:00:00',
  },
  {
    priority: 3,
    dueDate: '2020-02-04',
    createdAt: '2020-02-02 13:00:00',
  },
  {
    priority: 3,
    dueDate: '2020-02-05',
    createdAt: '2020-02-03 13:00:00',
  },
  {
    priority: 3,
    dueDate: '2020-02-06',
    createdAt: '2020-02-04 13:00:00',
  }
];

test('sort by dueDate', t => {
  t.deepEqual(sortTasks( [...tasks],'dueDate', moment), [
    {
      priority: 1,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 1,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 1,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    }
  ]);
});

test('sort by priority', t => {
  t.deepEqual(sortTasks( [...tasks],'priority', moment), [
    {
      priority: 1,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 1,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 1,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    }
  ]);
});

test('sort by creationDate', t => {
  t.deepEqual(sortTasks( [...tasks],'creationDate', moment), [
    {
      priority: 1,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-06',
      createdAt: '2020-02-04 13:00:00',
    },
    {
      priority: 1,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-05',
      createdAt: '2020-02-03 13:00:00',
    },
    {
      priority: 1,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 2,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
    {
      priority: 3,
      dueDate: '2020-02-04',
      createdAt: '2020-02-02 13:00:00',
    },
  ]);
});
