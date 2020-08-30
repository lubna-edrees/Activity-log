# Redux

## redux articuture

- store all of our application state into ` one javascript object` called store.
- the store is the single source of truth, and it is accessible by all parts of the ui.
- redux follows the functional programming principles.
- the store is immutable, so we need a function to mutate it, this function is the `reducer`.
- the reducer copies the store and returns a new updated version of this store.
- the reducer return the new updated store  after applying an action to it.
- reducers are pure functions, they don't change any state or do any side effects. 

  ```js
    function reducer ( store, action ) {
      const updatedStore = { ...store } // copy the store
      updatedStore.something = dispatch ( action , store.something); // update the copied store
      return updatedStore; // return the updated copied store
    }
  ```
  
  ![redux artictture](https://i.imgur.com/RGzV9u7.png)
  
  
## start with redux

1. design the store.
2. define the actions.
3. create the reducer.
4. set up the store.

## 1. design the store

- store is smiply an immutable object, that contains all of our state.

  ```js
    const store = {
      state1 : [],
      state2 : {},
      state3 : false,
      ...
    }
  ```
  
## 2. define the actions

- action is an object with at least one single property called `type`.
- payload is an objct contains all the data associated with one action.


  ```js
    const action = {
      type: "ACTION_TYPE",
      payload : {
        id : 44,
        description: " ... ", 
        },
      },
  ```

## 3. create the reducer

- reducer is a function that takes a state and apply an action to it.

  ```js
    const id = 0;
    function reducer (state = store.state1, action ) {
      if (action.type === "ACTION_TYPE1") {
        return [ ...state, {
          id : ++id, 
          description: action.payload.description,
          ....
        } ];
        
      } else if (action.type === "ACTION_TYPE2") {
        return ...;
      }
    
    return state; // default
    }
  ```
  
## 4. set up the store 

  ```js
    import { createStore } from "redux";
    import reducer from "./reducer";
    
    const store = createStore([ reducer ]);
    
    export default store; 
  ```
