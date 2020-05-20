const Datastore = require('nedb');
const moment = require('moment');

const database = new Datastore({ filename: './db/tasks.db', autoload: true });

exports.getAll = () => (new Promise((resolve) => {
  database.find({}, (err, items) => {
    resolve(items);
  });
}));

exports.getById = (id) => (new Promise((resolve) => {
  database.findOne({ _id: id }, (err, item) => {
    resolve(item);
  });
}));

exports.create = (task) => {
  database.insert({
    ...task,
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  });
};

exports.update = (taskId, task) => {
  database.update({ _id: taskId }, { ...task });
};

exports.remove = (taskId) => {
  database.remove({ _id: taskId });
};

exports.clearAll = () => {
  database.remove({});
};
