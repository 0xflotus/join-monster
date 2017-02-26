const { execSync } = require('child_process')
const assert = require('assert')

assert(process.env.MYSQL_URL, 'Environment variable MYSQL_URL must be defined, e.g. "mysql://user:pass@localhost/"')
assert(process.env.PG_URL, 'Environment variable PG_URL must be defined, e.g. "postgres://user:pass@localhost/"')

;(async () => {
  console.log('building sqlite3')
  await require('./setup/test1')()
  await require('./setup/demo')()

  console.log('building mysql')
  process.env.DB = 'MYSQL'
  await require('./setup/test1')()
  await require('./setup/test2')()

  console.log('building postgres')
  process.env.DB = 'PG'
  await require('./setup/test1')()
  await require('./setup/test2')()
  await require('./setup/demo')()
})()
.catch(err => {
  console.error(err)
  throw err
})

