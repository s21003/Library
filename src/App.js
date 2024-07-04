import React from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import CzytelnikList from './components/czytelnik/CzytelnikList';
import CzytelnikDetails from './components/czytelnik/CzytelnikDetails';
import CzytelnikForm from './components/czytelnik/CzytelnikForm';
import CzytelnikDelete from './components/czytelnik/CzytelnikDelete';
import KsiazkaList from './components/ksiazka/KsiazkaList';
import KsiazkaDetails from './components/ksiazka/KsiazkaDetails';
import KsiazkaForm from './components/ksiazka/KsiazkaForm';
import KsiazkaDelete from './components/ksiazka/KsiazkaDelete';
import WypozyczenieList from './components/wypozyczenie/WypozyczenieList';
import WypozyczenieDetails from './components/wypozyczenie/WypozyczenieDetails';
import WypozyczenieForm from './components/wypozyczenie/WypozyczenieForm';
import WypozyczenieDelete from './components/wypozyczenie/WypozyczenieDelete';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './components/other/LoginForm';
import ProtectedRoute from './components/other/ProtectedRoute';
import { getCurrentUser } from "./helpers/authHelper";

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: '',
      prevPath: ''
    }
  }

  handleLogin = (user) => {
    localStorage.setItem("user", user)
    this.setState({ user: user})
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({ user: undefined })
  }

  componentDidMount() {
    const currentUser = getCurrentUser()
    this.setState({ user: currentUser })
  }


  render(){
    return (
      
      <Router>
      <div>
          <Header />
          <Navigation handleLogout={this.handleLogout} />
          <Switch>
            <Route exact path="/" component={MainContent} />

            <Route exact path="/czytelnicy" component={CzytelnikList} />
            <ProtectedRoute exact={true} path="/czytelnicy/details/:czytId" component={CzytelnikDetails} />
            <Route exact path="/czytelnicy/add" component={CzytelnikForm} />
            <ProtectedRoute exact={true} path="/czytelnicy/edit/:czytId" component={CzytelnikForm} />
            <ProtectedRoute exact={true} path="/czytelnicy/delete/:czytId" component={CzytelnikDelete} />

            <Route exact path="/ksiazki" component={KsiazkaList} />
            <ProtectedRoute exact={true} path="/ksiazki/details/:ksiId" component={KsiazkaDetails} />
            <ProtectedRoute exact={true} path="/ksiazki/add" component={KsiazkaForm} />
            <ProtectedRoute exact={true} path="/ksiazki/edit/:ksiId" component={KsiazkaForm} />
            <ProtectedRoute exact={true} path="/ksiazki/delete/:ksiId" component={KsiazkaDelete} />

            <ProtectedRoute exact={true} path="/wypozyczenia" component={WypozyczenieList} />
            <ProtectedRoute exact={true} path="/wypozyczenia/details/:wypId" component={WypozyczenieDetails} />
            <ProtectedRoute exact={true} path="/wypozyczenia/add" component={WypozyczenieForm} />
            <ProtectedRoute exact={true} path="/wypozyczenia/edit/:wypId" component={WypozyczenieForm} />
            <ProtectedRoute exact={true} path="/wypozyczenia/delete/:wypId" component={WypozyczenieDelete} />

            <Route exact
                path="/login"
                render={(props) => (
                  <LoginForm handleLogin={this.handleLogin} />
                )}
            />

          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App