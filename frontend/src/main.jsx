import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
    },
    secondary: {
      main: '#EC4899', // Pink
    },
    background: {
      default: '#F3F5F9', // Soft cool gray backdrop
      paper: '#FFFFFF', // Clean white paper
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.02em', color: '#111827' },
    h4: { fontWeight: 800, letterSpacing: '-0.03em', color: '#111827' },
    h3: { fontWeight: 800, letterSpacing: '-0.03em', color: '#111827' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
          color: '#FFF',
          boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338CA 0%, #4F46E5 100%)',
            boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)',
            transform: 'translateY(-1px)',
          }
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: 12,
            transition: '0.3s',
            '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.1)' },
            '&:hover fieldset': { borderColor: '#4F46E5' },
            '&.Mui-focused fieldset': { borderColor: '#4F46E5', borderWidth: '2px' },
            '&.Mui-focused': { backgroundColor: '#FFFFFF', boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)' }
          }
        }
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
