# React

## General 
- when you design your routes, make sure that front end routes differe from back-end routes. especially when using `react-node` app.
- to apply a css file to one component only:
  1. wrap you component into `<div className="Component-Name">`.
  2. use that class before the css rules you want to apply for this component only as: `.component-name p{ //css rules }`


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
