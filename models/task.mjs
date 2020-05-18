import Datastore from 'nedb';
import moment from 'moment';

const database = new Datastore({ filename: './db/tasks.db', autoload: true });

export function getAll() {
  return new Promise((resolve) => {
    database.find({}, (err, items) => {
      resolve(items.map((item) => ({ ...item, status: 'ok' })));
    });
  });
}


export function getById(id) {
  return new Promise((resolve) => {
    database.find({ _id: id }, (err, items) => {
      resolve(items.map((item) => ({ ...item, status: 'ok' }))[0]);
    });
  });
}

export function create(task) {
  database.insert({
    ...task,
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  });
}

export function update(taskId, task) {
  database.update({ _id: taskId }, { ...task });
}

export function remove(taskId, task) {
  database.remove({ _id: taskId });
}
