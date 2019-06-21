/* global supertest */
const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeNotesArray } = require('./notes.fixtures')
const { makeFoldersArray } = require('./folders.fixtures')

describe('Notes Endpoints', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE notes, folders RESTART IDENTITY CASCADE'))

  afterEach('cleanup', () => db.raw('TRUNCATE notes, folders RESTART IDENTITY CASCADE'))

  describe(`GET /api/notes`, () => {
    context('Given there are notes in the database', () => {
      const testFolders = makeFoldersArray()
      const testNotes = makeNotesArray()

      beforeEach('insert notes', () => {
        return db
          .into('folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('notes')
              .insert(testNotes)
          })
      })

      it('GET /api/notes responds with 200 and all of the notes', () => {
        return supertest(app)
          .get('/api/notes')
          .expect(200, testNotes)
      })
    })
    context('given no notes', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/notes')
          .expect(200, [])
      })
    })
  })

  describe('GET /api/notes/:note_id', () => {
    context('Given no notes', () => {
      it('responds with 404', () => {
        const noteId = 12355
        return supertest(app)
          .get(`/api/notes/${noteId}`)
          .expect(404, { error: { message: `Note doesn't exist` } })
      })
    })
    context('Given there are notes in the database', () => {
      const testFolders = makeFoldersArray()
      const testNotes = makeNotesArray()

      beforeEach('insert notes', () => {
        return db
          .into('folders')
          .insert(testFolders)
          .then(() => {
            return db
              .into('notes')
              .insert(testNotes)
          })
      })

      it('GET /api/notes/:note_id responds with 200 and the specified note', () => {
        const noteId = 1
        const expectedNote = testNotes[noteId - 1]

        return supertest(app)
          .get(`/api/notes/${noteId}`)
          .expect(200, expectedNote)
      })
    })
  })
})
