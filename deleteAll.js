const db = require('./models');

db.Animal.deleteMany().then(()=> console.log('Animals deleted'))
db.Trail.deleteMany().then(()=> console.log('Trails deleted'))

