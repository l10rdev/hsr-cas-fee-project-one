import Datastore from 'nedb';
import moment from 'moment'

const database = new Datastore({ filename: './db/tasks.db', autoload: true });

export function getAll() {
    return new Promise((resolve, reject) => {
        database.find({}, (err, items) => {
            resolve(items.map(item => ({...item, status: 'ok'})));
        });
    })
}

export function create(task) {
    database.insert({
        ...task,
        createdAt: moment().format('YYYY--MM-DD'),
    })
}

