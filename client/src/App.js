import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Admin, About, LoginRegister, Home } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={About} path="/about" exact />
        <Route component={Home} path="/" exact />
        <ProtectedRoute
          component={Admin}
          path="/admin"
          isAuthenticated={false}
          exact
          redirectPath="/loginregister"
        />
        <ProtectedRoute
          component={LoginRegister}
          redirectPath="/"
          path="/loginregister"
          exact
          isAuthenticated={true}
        />
      </Switch>
    </Router>
  );
}

export default App;

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
