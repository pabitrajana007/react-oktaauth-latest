import React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from './components/User';
import restProvider from 'ra-data-simple-rest';
import {UserCreate} from './components/UserCreate';
import {UserEdit} from './components/UserEdit';


import Login from './Login';
import { Route } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';

const dataProvider = restProvider('http://localhost:3000')

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-45189647.okta.com/oauth2/default',
  clientId: '0oa9560z4zUqfEev65d7',
  redirectUri: window.location.origin + '/callback'
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  const onAuthRequired = function() {
    history.push('/login')
  }

  return (
    
          <Security oktaAuth={oktaAuth}
                    restoreOriginalUri={restoreOriginalUri}
                    onAuthRequired={onAuthRequired}>
            
            
            <Route path='/login' exact={true} component={Login}/>
            <Admin dataProvider={dataProvider}>
                  <Resource name="users" 
                    list={
                      <SecureRoute path="/users" component={UserList} />
                    } 
                    edit={
                      <SecureRoute path="/userEdit" component={UserEdit} />
                    }
                    create={
                      <SecureRoute path="/userCreate" component={UserCreate} />
                    }
                  />
                </Admin>
            <Route path='/callback' component={LoginCallback}/>
          </Security>
       
  );
}

export default App;

// function App() {
//   return (
//     // <Router>
//     //   <SecureRoute path="/User" exact component={UserList} />
//     //   <SecureRoute path="/UserEdit" exact component={UserEdit} />
//     //   <SecureRoute path="/UserCreate" exact component={UserCreate} />
//       <Admin dataProvider={dataProvider} >
//         <Resource name="users" 
//         list={UserList} 
//         edit={UserEdit}  
//         create={UserCreate}
//         />
//       </Admin>
//       // </Router>  
//     );
//   }

// export default App;