import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);

    // Fetch the newly inserted data to confirm it was saved correctly.
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log(
      "Data wasn't saved to the database"
    );
    return null;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get from the database");
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  result ? console.log('Data retrieved from the database', result.value) : console.log('Data not found in the database');  
  console.log(result.value); 
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)   
  return result?.value;
};

initdb();
