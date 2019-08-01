import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCoursesPage from './courses/ManageCoursePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
    <div className="container-fluid">
        <Header />
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/courses" component={CoursesPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/course/:slug" component={ManageCoursesPage}/>
            <Route path="/course" component={ManageCoursesPage}/>
            <Route component={PageNotFound}/>
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar/>
    </div>
);

export default App;