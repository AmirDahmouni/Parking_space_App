
import { BrowserRouter, Route, Link,Switch } from 'react-router-dom';
import RegisterScreen from './components/RegisterScreen';
import ProfilScreen from "./components/ProfileScreen"
import SigninScreen from "./components/SigninScreen";
import HomeScreen from "./components/HomeScreen";
import ParkingsScreen from "./components/ParkingsScreen";
import BookingsScreen from "./components/BookingsScreen";
import CarsScreen from "./components/CarsScreen";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from "./utils/Header"
import UsersScreen from './components/UsersScreen';
import ParkingScreen from './components/ParkingScreen';


const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_IP}/graphql`
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const closeMenu = () => {
  document.querySelector('.sidebar').classList.remove('open');
};

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
         <Header/>
         <aside className="sidebar">
          <h3>closer parkings</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
              <li><Link to={`/category/`}></Link></li>
          </ul>
        </aside>
         <Switch>
           <Route path="/" exact={true} component={HomeScreen} />
           <Route path="/register" component={RegisterScreen} />
           <Route path="/signin" component={SigninScreen}/>
           <Route path="/profile" component={ProfilScreen} />
           <Route path="/users" component={UsersScreen}/>
           <Route path="/parkings" component={ParkingsScreen} />
           <Route path="/bookings" component={BookingsScreen}/>
           <Route path="/cars" component={CarsScreen}/>
           <Route path="/parking/:id" component={ParkingScreen}/>
           
           
         </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;
