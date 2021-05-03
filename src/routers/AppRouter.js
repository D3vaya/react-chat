import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  console.log(auth);
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return <h1>Espere por favor</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* // NOTE AuthRouter controlara las rutas /login & /redirect */}
          {/* <Route path="/auth" component={AuthRouter} /> */}
          {/* <Route exact path="/" component={ChatPage} /> */}
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            exact
            isAuthenticated={auth.logged}
            component={ChatPage}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
