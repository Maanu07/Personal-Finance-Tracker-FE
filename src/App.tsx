import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import { FinancialRecordProvider } from "./contexts/financial-record-context";

import "./App.css";
import NotFound from "./pages/NotFound";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  const { user } = useUser();

  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
          {!user && <Link to="/auth">Sign In</Link>}
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordProvider>
                <Dashboard />
              </FinancialRecordProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
