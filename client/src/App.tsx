import { useState } from 'react';
import LoginPage from './components/LoginModule/LoginPage';
import DocumentsPage from './components/DocumentsModule/DocumentsPage';
import { LoginPageState, DocumentsListState } from './ts/interfaces/States.interface';
import UserAPI from './ts/classes/API/UserAPI.class';
import PrivateDocumentsAPI from './ts/classes/API/PrivateDocumentsAPI.class';
import PublicDocumentsAPI from './ts/classes/API/PublicDocumentsAPI.class';
import ErrorMessage from './components/ErrorModule/ErrorMessage';
import User from './ts/classes/User.class';
import './App.css';

type PageName = (
    LoginPageState | DocumentsListState 
)["page"];

interface AppState {
  page: PageName
};

function App() {
    const [AppState, setAppState] = useState<AppState>({page: "loginPage"});

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState<User | null>(null);

    const errorOccured = (message: string) => {
        setHasError(true);
        setErrorMessage(message);
    };
    const errorClosed = () => { setHasError(false); };

    let currentPage;

    switch (AppState.page) {
        case "loginPage":
            currentPage = <LoginPage 
                    userLogined={() => setAppState({page: "documentsList"})} 
                    errorOccured={errorOccured}
                    errorClosed={errorClosed}
                    API={new UserAPI(setUser)}
                    />;
            break;
        case "documentsList":
            currentPage = <DocumentsPage 
                publicDocumentsAPI={new PublicDocumentsAPI()}
                privateDocumentsAPI={new PrivateDocumentsAPI(user as User)}
                errorOccured={errorOccured}
                />;
            break;
    }

    return (
        <div className='App'>
            {currentPage}
            <ErrorMessage message={errorMessage} show={hasError} handleClose={() => {setHasError(false);}}/>
        </div>

    );
}

export default App;
