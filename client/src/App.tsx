import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginModule/LoginPage';
import DocumentsList from './components/DocumentsModule/DocumentsList';
import Document from './components/DocumentsModule/Document';
import { LoginPageState, DocumentsListState, DocumentState } from './ts/interfaces/States.interface';
import UserAPI from './ts/classes/API/UserAPI.class';
import DocumentsAPI from './ts/classes/API/DodumentsAPI.class';
import ErrorMessage from './components/ErrorModule/ErrorMessage';

type PageName = (
    LoginPageState | DocumentsListState | DocumentState
)["page"];

interface AppState {
  page: PageName
};

function App() {
    const [AppState, setAppState] = useState<AppState>({page: "loginPage"});

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let currentPage;

    switch (AppState.page) {
        case "loginPage":
            currentPage = <LoginPage 
                    userLogined={() => setAppState({page: "documentsList"})} 
                    errorOccured={(message: string) => {
                        setHasError(true);
                        setErrorMessage(message);
                    }}
                    API={new UserAPI()}
                    />;
            break;
        case "documentsList":
            currentPage = <DocumentsList API={new DocumentsAPI()}/>;
            break;
        case "document":
            currentPage = <Document/>;
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
