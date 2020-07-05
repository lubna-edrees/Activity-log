# React

## General

- when you design your routes, make sure that front end routes differe from back-end routes. especially when using `react-node` app.
- to apply a css file to one component only:
  1. wrap you component into `<div className="Component-Name">`.
  2. use that class before the css rules you want to apply for this component only as: `.component-name p{ //css rules }`
- handle 404 route: add this code as the last `Route` in the `switch` statement:
  ```js
  <Route path="*" component={NotFound} />;
  {
    /* OR */
  }
  <Route component={NotFound} />;
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

- passing functions to the events should be by `reference`, but
  if we call the function inside the event listener it will be called `imediatley` and not waiting until the event is bieng fired.

  ```js
  <Component onClick={myFunction} />
  // will wait untill you click to fire the function
  <Component onClick={myFunction()} />
  // the function will be fired immediatley.
  <Component onClick={(e, someVar) => myFunction(someVar)} />
  // this way we can pass parameters to that handlers
  ```

- passing functions as props should be by reference.

### Hide dom element by click outside of it 

```
export default class ClickOutsideClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divshow: true
    };
  }
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, false);
  }

  handleClickOutside = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    if (this.state.divshow) {
      this.setState({ divshow: false });
    }
  };
  render() {
    return this.state.divshow ? (
      <div>
        <div
          ref={node => (this.node = node)}
          style={{ backgroundColor: "red", height: "200px" }}
        >
          <p>click outside to close me </p>
        </div>
      </div>
    ) : (
      "Hided"
    );
  }
}
```
