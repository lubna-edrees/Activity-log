# MongoDB

- Reference: [mongo shell quick reference](https://docs.mongodb.com/manual/reference/mongo-shell/)
- list all dbs in the mongo shell: `show dbs`
- work with one db: `use dbs`
- extracting the date from `ObjectId`:
  
  ```js
   const date = new Date(parseInt(doc._id.substring(0, 8), 16) * 1000); 
   // new date object when this object created.
   ```