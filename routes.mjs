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
  console.log("created user")
    const [result] = await pool.query(`
    INSERT INTO Users (longitude, latitude, emerg)
    VALUES (?, ?, ?)`, [longitude, latitude, emerg])
    return result.insertId
}

export async function updateUser(id, longitude, latitude, emerg){
  console.log("updated user", id)
  const [result] = await pool.query(`
  UPDATE Users 
  SET longitude=?, latitude=?, emerg=?
  WHERE id=?`, [longitude, latitude, emerg, id])
  return result.insertId
}
