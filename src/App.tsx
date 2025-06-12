import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assuming a generic Homepage for the root path for now
// If you have a specific Homepage component, import it here, e.g.:
// import Homepage from "./pages/Homepage"; 
const PlaceholderHomepage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-3xl font-bold">Welcome to YourApp</h1>
    <p className="mt-2">This is a placeholder homepage.</p>
    <p className="mt-4">
      <Link to="/login" className="text-blue-500 hover:underline">Go to Login</Link>
    </p>
  </div>
);
import { Link } from 'react-router-dom'; // Added for PlaceholderHomepage

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound"; // Always Must Include (Assuming we already have NotFound.tsx)

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Placeholder for Homepage, adjust as needed */}
          <Route path="/" element={<PlaceholderHomepage />} /> 
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* e.g., /reset-password?token=abcdef12345 */}

          {/* ADD ALL OTHER CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;