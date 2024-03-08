import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LabelPage from './page/LabelPage/LabelPage'
import LoginPage from './page/LoginPage/Login'


function App() {
  
  const Navigation = () => {
    const navigate = useNavigate()
    const { isAuthenticated, role } = useSelector((state) => state.user)
    useEffect(() => {
      if (isAuthenticated && role === 'user') {
        navigate('/user');
      } else if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, role, navigate])

    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<LabelPage />}/>
        <Route 
          path="*" 
          element={
            isAuthenticated && role === 'user'
              ? <Navigate to="/user" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    )
  }

  return (
    <Router>
      <Navigation />
    </Router>  
  );
}

export default App;
