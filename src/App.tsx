import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Import QueryClient and QueryClientProvider
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'

// Initialize the query client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>  {/* Wrap your app with QueryClientProvider */}
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer /> 
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
