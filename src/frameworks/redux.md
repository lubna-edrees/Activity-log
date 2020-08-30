# Redux

## redux articuture

- store all of our application state into ` one javascript object` called store.
- the store is the single source of truth, and it is accessible by all parts of the ui.
- redux follows the functional programming principles.
- the store is immutable, so we need a function to mutate it, this function is the `reducer`.
- the reducer copies the store and returns a new updated version of this store.
- the reducer return the new updated store  after applying an action to it.

  ```js
    function reducer ( store, action ) {
      const updatedStore = { ...store } // copy the store
      updatedStore.something = action ( store.something);
      return updatedStore
    }
  ```
