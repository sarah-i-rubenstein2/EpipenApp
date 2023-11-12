import mysql from 'mysql2'

const pool = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'sarah',
  password : '1234',
  database : 'epipen'
}).promise()

export async function getUsers(){
    const result = await pool.query("SELECT * FROM Users")
    const rows = result[0]
    return rows
}

export async function createUser(longitude, latitude, emerg){
    const [result] = await pool.query(`
    INSERT INTO Users (longitude, latitude, emerg)
    VALUES (?, ?, ?)`, [longitude, latitude, emerg])
    return result.insertId
}

export const result = await createUser(10.0000, 23.023, 0)
console.log(result)

