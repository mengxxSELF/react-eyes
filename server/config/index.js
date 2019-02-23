const mysql = require('mysql')
const thenifyAll = require('thenify-all')
const poolList = {}
const configs = {
  key: 'activity',
  host: ['127.0.0.1'],
  user: 'root',
  password: '5211314mxx',
  database: 'activity'
}

module.exports = function () {
  // console.log(configs)
  // 如果已经存在该数据库对应的链接，直接返回即可
  if (poolList[configs.key]) return poolList[configs.key]
  const mysqlConnection = mysql.createPool({
    connectionLimit: 3,
    host: configs.host,
    user: configs.user,
    charset: 'UTF8MB4_GENERAL_CI',
    password: configs.password,
    database: configs.database,
  })
  // mysqlConnection.connect();
  // 将创建好的数据库链接存到变量中
  const connection = poolList[configs.key] = thenifyAll(mysqlConnection, mysqlConnection, ['query'])
  return connection
}