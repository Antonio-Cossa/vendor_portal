import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App.jsx'
import { theme } from './styles/theme.js'
import { GlobalStyles } from '../../../../H/HexaCloud/Hexacloud Frontend/src/styles/GlobalStyles.js'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
