function makeNotesArray () {
  return [
    {
      id: 1,
      name: 'Note 1',
      modified: '2029-01-22T16:28:32.615Z',
      content: 'Note 1 Test content hello hi',
      folder_id: 1
    },
    {
      id: 2,
      name: 'Note 2',
      modified: '2100-05-22T16:28:32.615Z',
      content: 'Note 2 Test content hello hi',
      folder_id: 1
    },
    {
      id: 3,
      name: 'Note 3',
      modified: '1919-12-22T16:28:32.615Z',
      content: 'Note 3 Test content hello hi',
      folder_id: 2
    },
    {
      id: 4,
      name: 'Note 4',
      modified: '1919-12-22T16:28:32.615Z',
      content: 'Note 4 Test content hello hi',
      folder_id: 2
    }
  ]
}

module.exports = {
  makeNotesArray
}
