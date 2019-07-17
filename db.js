const fs = require('fs').promises;
/*
All of your functions must return a promise!
*/

/* 
Every function should be logged with a timestamp.
If the function logs data, then put that data into the log
ex after running get('user.json', 'email'):
  sroberts@talentpath.com 1563221866619

If the function just completes an operation, then mention that
ex after running delete('user.json'):
  user.json succesfully delete 1563221866619

Errors should also be logged (preferably in a human-readable format)
*/

function log(value) {
  return fs.appendFile('log.txt', `${value} ${Date.now()}\n`);
}

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */
async function get(file, key) {
  try {
    /** Async approach */
    const data = await fs.readFile(file, 'utf-8');
    const parsed = JSON.parse(data);
    const value = parsed[key];
    if (!value) return log(`ERROR ${key} invalid key on ${file}`);
    return log(value);
  } catch (err) {
    log(`ERROR no such file or directory ${file}`);
  }
  /** Promise approach */
  // // 1. read file
  // const readPromise = fs.readFile(file, 'utf-8');
  // // 2. handle promise -> data
  // return readPromise.then(data => {
  //   // 3. parse data from string -> JSON
  //   const filedata = JSON.parse(data);
  //   // 4. use the key to get the value at object[key]
  //   const value = filedata[key];
  //   // 5. append log file with the above value
  //   return log(value);
  // });
  /** **************** OR ****************** */
  /** return fs
    .readFile(file, 'utf-8')
    .then(data => {
      const parsed = JSON.parse(data);
      const value = parsed[key];
      if (!value) log(`ERROR ${key} invalid key on ${file}`);
      return log(value);
    })
    .catch(error => log(`ERROR no such file or directory ${file}`));
     */
}
/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
function set(file, key, value) {
  // always read the file first
  const fileData = fs.readFile(file, 'utf-8');
  return (
    fileData
      .then(data => {
        // parse the file data to js object
        const parsed = JSON.parse(data);
        // get the key data
        parsed[key] = value;
        // Return whole object
        return parsed;
      })
      // Make a new file everytime to add or change info
      .then(data => fs.writeFile(file, JSON.stringify(data, null, 2)))
      .catch(err => {
        log(err);
      })
  );
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */
function remove(file, key) {
  // read file info
  const fileData = fs.readFile(file, 'utf-8');
  return fileData
    .then(data => {
      // change file information to js object
      const parsed = JSON.parse(data);
      return parsed;
    })
    .then(data => {
      // deletes data key
      delete data[key];
      return data;
    })
    .then(data => fs.writeFile(file, JSON.stringify(data, null, 2)))
    .catch(err => log(err));
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
function deleteFile(file) {
  return fs
    .unlink(file)
    .then(() => {
      console.log(`${file} removed`);
    })
    .catch(err => log(err));
}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
function createFile(file) {
  return fs
    .writeFile(file)
    .then(() => console.log(`${file} created`))
    .catch(err => log(err));
}

/**
 * Merges all data into a mega object and logs it.
 * Each object key should be the filename (without the .json) and the value should be the contents
 * ex:
 *  {
 *  user: {
 *      "firstname": "Scott",
 *      "lastname": "Roberts",
 *      "email": "sroberts@talentpath.com",
 *      "username": "scoot"
 *    },
 *  post: {
 *      "title": "Async/Await lesson",
 *      "description": "How to write asynchronous JavaScript",
 *      "date": "July 15, 2019"
 *    }
 * }
 */

// Not too sure if this is the right answer
function mergeData() {
  // First read the files
  const scottFile = fs.readFile('scott.json', 'utf-8');
  const andrewFile = fs.readFile('andrew.json', 'utf-8');
  // Make the object to store the info
  const name = { Scott: '', Andrew: '' };
  // Make an array
  const allPaths = Promise.all([scottFile, andrewFile]);
  return allPaths
    .then(data => {
      // parse the data
      const scott = JSON.parse(data[0]);
      const andrew = JSON.parse(data[1]);
      // put object into object
      name.Scott = scott;
      name.Andrew = andrew;
      // log the object out!
      return name;
    })
    .then(obj => console.log(JSON.stringify(obj, null, 2)))
    .catch(err => log(err));
}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
function union(fileA, fileB) {
  const firstFile = fs.readFile(fileA, 'utf-8');
  const secondFile = fs.readFile(fileB, 'utf-8');
  const allPaths = Promise.all([firstFile, secondFile]);
  return allPaths.then(data => {
    const first = JSON.parse(data[0]);
    console.log(first);
    const second = JSON.parse(data[1]);
    console.log(second);
    const newbrah = union(first, second);
    console.log(newbrah);
  });
}

/**
 * Takes two files and logs all the properties that both objects share
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    intersect('scott.json', 'andrew.json')
 *    // ['firstname', 'lastname', 'email']
 */
function intersect(fileA, fileB) {}

/**
 * Takes two files and logs all properties that are different between the two objects
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    difference('scott.json', 'andrew.json')
 *    // ['username']
 */
function difference(fileA, fileB) {}

module.exports = {
  get,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
