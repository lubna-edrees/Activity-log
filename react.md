# React


## component that will simplify your routes:

- usage `<SimpleRoute path={path} component={component_to_render} / >`

```js
import React from 'react'
import { Route } from 'react-router-dom'

const SimpleRoute({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <div>
          <Component {...props} />
        </div>
      )
    }}
  />
)

export default SimpleRoute
```
