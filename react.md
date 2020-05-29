# React

## General 
- when you design your routes, make sure that front end routes differe from back-end routes. especially when using `react-node` app.
- to apply a css file to one component only:
  1. wrap you component into `<div className="Component-Name">`.
  2. use that class before the css rules you want to apply for this component only as: `.component-name p{ //css rules }`
- handle 404 route: add this code as the last `Route` in the `switch` statement:
      
    ```js 
    <Route path="*" component={NotFound} /> 
    {/* OR */}
     <Route  component={NotFound} /> 
    ```

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

## component will recieve props 

- check if we are still on the same component `OR` ifwe are coming from another component:
  ```js
   componentWillReceiveProps = newProps => {
    if (newProps.location !== this.props.location) {
      console.log('here should we gos')
    }
    
    /*
    * typical props.location at the first mount of the copmonent, where the props.location == newprops.location 
    */
    
    this.props.window =  {pathname: "/page", search: "", hash: "", state: undefined, key: "yooxfy"}
    
    /*
    * if the component re-rendered in the same page, the { this.props.window.key } will change,
    *  so they are no longer equal.
    */

  ```
