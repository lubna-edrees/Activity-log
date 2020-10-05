# Sequalize

- sequlize is an object object relational mapper. that maps the normal RDS (relational data bases) tables into objects so that it will go along with OOP languages. saves you fromm writting SQL commands or query.

## pros

- less and more consistent code.
- No SQl queries.
- abstract DB engines.
- does a lot of things automatically.
- Migrations are easier.

## cons

- complicated queries might be slow.
- you might loss your DB knolowedge with time.

# usage
- install Sequalize, `AND`, install DB engine like: mysql, sqlite ...

### 1 - connection

  ```js
      const Sequalize = require('sequalize');  // generator function
      const connection = new Sequalize("DB name", "username", "password", { dialect: "mysql as default" /* optional */ });

  ```

### 2 -creating a model

  ```js
      const MyModel = connection.define("MyModel", { 
          // Model properties 
          field1: Sequalize.STRING,
          field2: Sequalize.TEXT
      })
  ```

### 3 - executing

- synchronization with DB: 
    1. connecting to the DB
    2. automaticallu generate SQL and execute it to create the tables (if not already exists) From your defined Models.

> IMPORTANT: Sequalize will not create the DB automatically, you have to create the DB yourself.


  ```js
        const options = {
            logging: true,
            force: true, // forcing updat tables ** NOT RECOMMNDED FOR PRODUCTIO**
        }

        connection.sync(options); // entry point for squakize work
        // this is async function, you have to await it or use promises
  ```
### 4 - create a doc (row)

  ```js
    // you need to await connection.sync() first
    MyModel.create({ // executes INSERT query
        filed1: "data",
        field2: "data ........."
    })
  ```
### 5- Find (SELECT)

  ```js
    // await synch
    // Find one
    MyModel.findById(id).then(function (result){  
        console.log(result.dataValues); // object
        // your results in results.dataValues 
    });

    // Find All
    MyModel.findAll().then(function (result){ 
        console.log(result.dataValues); // Array<object>
        // your results in results.dataValues
    });
  ```
### 6- Advanced Models

```js
      const MyModel = connection.define("MyModel", { 
          // Model properties 
          field1: Sequalize.STRING,
          field2: { 
              type: Sequalize.STRING, // type of field
              allowNull: true, // true or false
              unique: true, // true or false
              defaultValue: "default value ..", // if no value is provided
              validate: {  // validate data before inserting
                    is : "string or regex", // is the data equals to a string or regex
                    len: [2,10], // string length should be between 2 and 10

                    /* respond with custom error message */
                    len : {
                        args: [2.10], // value of the validation
                        msg: "please enter stiri ng with length between 2 and 10", // this msg will be sent in case of error here
                    },

                    /* cutom validations */
                    myValidationRuleName : function(fieldValue){
                        var validation;
                        /* do you checks on the field value and return boolean store it on validation */
                        if(!validation){
                            throw new Error(' validation failed, the value you have entered is not accepted');
                        } else {
                            // don't do nothing, but you have to write this else, it is a syntax.
                            // if no error thrown => the value is valid
                        }  
                    }


                    
              },
              primaryKey: true, // this field2  key, id field is deleted automatically.

          },
          {
              // model options
              timestamps: false,
              freezeTableName: true, // prevent sequalize from giving our table a plural name  
              hooks:{ // middlewares or function to applied to every doc.
                  // all hooks are here
                  beforeCreate: function(){
                  
                  },
                  beforeValidate: () => {},
                  afterValidate: () => {},
                  afterCreate: (result) => { console.log(result.dataValues); },
              }
          }
      })
  ```

### VERY IMPORTANT: connection.sync() will never update a table structure if it's already created.

- If you want to update the table structure ( like adding or removing columns) you can do one of the following:
    1. you have to delete the table first. (table data will be lost )
    2. create new model with different name, in order to not lost the data.
    3. apply Migrations.
    4. apply force as following: NOT RECOMMENDED For Production

       ```js
        connection.sync({ force: true }); // all data in the table will be deleted
       ``` 

### IMPORTANT: allowNull

- allowNull is true by default
- if you `DID NOT` specify `allowNull: false`, any validation to this field will not be applied (as if you have `NO VALIDATION` at all).

## 7- CRUD

    ```js
        connection.sync(options).then(() => {
            const createOptions = {
                // options for create function
                fields:["field1", "field2"], // white listed fields, fields that allowed to be submitted by user request
            }
            MyModel.create({ /* my doc data */ }, createOptions); // creating a doc then save to the database

            var doc1 = MyModel.build({ /* my doc data */ }); // create doc, Don't save. interact with the doc sync without waiting db saving
            doc1.save(); // save the doc created by build method
            
            const bulkCreateOptions = {
                // options for bulk create
                fields:["field1","field2"],
                validate: true, // bydefault createBulk skip validation, you have to specify the validate to true to run them
                ignoreDuplicate: true, // skip duplication error if one the documents already exists, continue creating other documents
            }
            MyModel.bulkCreate([doc1, doc2], bulkCreateOptions); // create multiple documents at once

        })
    ```
