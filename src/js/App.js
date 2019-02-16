import React, {Component} from "react"
import {Link,Switch,Route} from "react-router-dom";

import HomePage from "./HomePage"
import OrgList from "./organizations/OrgList"
import EmplList from "./employees/EmplList"
import OrgTree from "./organizations/OrgTree"
import EmplTree from "./employees/EmplTree"

import "../css/App.css"



class App extends Component{
    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        );
    }
}

const Header = () => (
    <div>
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link active" to={"/"} id={"main-page"}>Main</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to={"orglist"} id={"org-list"}>Organizations</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"empllist"} id={"empl-list"}>Employees</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"orgtree"} id={"org-tree"}>Organizations tree</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={"empltree"} id={"empl-tree"}>Employees tree</Link>
            </li>
        </ul>
    </div>
);

const Main = () =>(
    <div>
        <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route path={"/orglist"} component={OrgList}/>
            <Route path={"/empllist"} component={EmplList}/>
            <Route path={"/orgtree"} component={OrgTree}/>
            <Route path={"/empltree"} component={EmplTree}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

const NoMatch = ({ location }) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
);

export default App;