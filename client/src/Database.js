import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
}).promise()

export async function getUsers(){
  const [rows] = await pool.query("SELECT * FROM users") 
  return rows
}

export async function getUser(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  return rows
}

export async function createUser(username, password_hash, email, user_first_name, user_last_name) {
  const result = await pool.query(
    'INSERT INTO users (username, password_hash, email, user_first_name, user_last_name) VALUES (?, ?, ?, ?, ?)',
    [username, password_hash, email, user_first_name, user_last_name])
    return result
}

export async function getReviewsForBook(google_book_id) {
  const [rows] = await pool.query(
    'SELECT * FROM reviews WHERE google_book_id = ?',
    [google_book_id]
  )
  return rows
}

export async function createReview(google_book_id, user_id, rating, review_text) {
  const result = await pool.query(
    'INSERT INTO reviews (google_book_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)',
    [google_book_id, user_id, rating, review_text]
  )
  return result
}

export async function getUserLists(user_id) {
  const [rows] = await pool.query(
    'SELECT * FROM lists WHERE user_id = ?',
    [user_id]
  )
  return rows
}

export async function createList(user_id, list_name) {
  const result = await pool.query(
    'INSERT INTO lists (user_id, list_name) VALUES (?, ?)',
    [user_id, list_name]
  )
  return result
}

export async function getListBooks(list_id) {
  const [rows] = await pool.query(
    'SELECT * FROM books_in_lists WHERE list_id = ?',
    [list_id]
  )
  return rows  
}

export async function addBookToList(list_id, google_book_id) {
  const result = await pool.query(
    'INSERT INTO books_in_lists (list_id, google_book_id) VALUES (?, ?)',
    [list_id, google_book_id]
  )
  return result
}

export async function getNotesForBook(google_book_id, user_id) {
  const [rows] = await pool.query(
    'SELECT * FROM notes WHERE google_book_id = ? AND user_id = ?',
    [google_book_id, user_id]  
  )
  return rows
}

export async function createNote(google_book_id, user_id, note_text) {
  const result = await pool.query(
    'INSERT INTO notes (google_book_id, user_id, note_text) VALUES (?, ?, ?)',
    [google_book_id, user_id, note_text]
  )
  return result
}
