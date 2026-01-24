import { Switch, Route, Redirect } from "wouter";
import Home from "./pages/Home";
import Notices from "./pages/Notices";
import Complaint from "./pages/Complaint";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddNotice from "./pages/AddNotice";
import StudentLogin from "./pages/StudentLogin";

function App() {
  return (
    <Switch>
      {/* <Route path="/" component={Home} /> */}
       <Route path="/" component={StudentLogin} />
      <Route path="/notices" component={Notices} />
      <Route path="/complaint" component={Complaint} />
      
      <Route path="/Home" component={Home} />
     
      {/* Admin Routes */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        {() => (localStorage.getItem("isAdmin") === "true" ? <AdminDashboard /> : <Redirect to="/admin" />)}
      </Route>
      <Route path="/admin/add-notice">
        {() => (localStorage.getItem("isAdmin") === "true" ? <AddNotice /> : <Redirect to="/admin" />)}
      </Route>
    </Switch>
  );
}

export default App;