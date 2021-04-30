import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          {/* // NOTE AuthRouter controlara las rutas /login & /redirect */}
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={ChatPage} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};