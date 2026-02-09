import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setUser, logout, setLoading } from './redux/slices/authSlice';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';
import { useDynamicCursor } from './utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import './App.css';
import MainContainer from './pages/MainContainer';

// Auth listener component
function AuthListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user profile from Firestore
          const docRef = doc(db, 'memberships', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            dispatch(setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...docSnap.data()
            }));
          } else {
            dispatch(setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email
            }));
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          dispatch(setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email
          }));
        }
      } else {
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}

// Layout component to conditionally show navbar/footer
function Layout({ children }) {
  const location = useLocation();
  const isStandalonePage =
    location.pathname === '/vote' ||
    location.pathname === '/tarek';

  if (isStandalonePage) {
    return (
      <main className='vote-main-content'>
        {children}
      </main>
    );
  }

  return (
    <div className="layout-wrapper">
      <ThemeSelector />
      <main className='main-content'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // Use the dynamic cursor hook
  useDynamicCursor();

  return (
    <Provider store={store}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthListener>
          <div className="App">
            <Suspense fallback={null}>
              <Layout>
                <Routes>
                  <Route path="/" element={<MainContainer page="home" />} />
                  <Route path="/about" element={<MainContainer page="about" />} />
                  <Route path="/join" element={<MainContainer page="join" />} />
                  <Route path="/login" element={<MainContainer page="login" />} />
                  <Route path="/profile" element={<MainContainer page="profile" />} />
                  <Route path="/vote" element={<MainContainer page="vote" />} />
                  <Route path="/dashboard" element={<MainContainer page="dashboard" />} />
                  <Route path="/candidates" element={<MainContainer page="candidates" />} />
                  <Route path="/tarek" element={<MainContainer page="tarek" />} />
                </Routes>
              </Layout>
            </Suspense>
          </div>
        </AuthListener>
      </Router>
    </Provider>
  );
}

export default App;
