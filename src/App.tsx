import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import MentalCoach from "./pages/MentalCoach";
import PhysicalCoach from "./pages/PhysicalCoach";
import Roadmaps from "./pages/Roadmaps";
import DayTracker from "./pages/DayTracker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Using React.createElement to avoid JSX transform issues
const App = () => React.createElement(QueryClientProvider, { client: queryClient },
  React.createElement(AuthProvider, {},
    React.createElement(TooltipProvider, {},
      React.createElement(Toaster, {}),
      React.createElement(Sonner, {}),
      React.createElement(BrowserRouter, {},
        React.createElement(Routes, {},
          React.createElement(Route, { path: "/login", element: React.createElement(Login, {}) }),
          React.createElement(Route, { path: "/register", element: React.createElement(Register, {}) }),
          React.createElement(Route, { path: "/", element: React.createElement(ProtectedRoute, {}, React.createElement(Index, {})) }),
          React.createElement(Route, { path: "/mental", element: React.createElement(ProtectedRoute, {}, React.createElement(MentalCoach, {})) }),
          React.createElement(Route, { path: "/physical", element: React.createElement(ProtectedRoute, {}, React.createElement(PhysicalCoach, {})) }),
          React.createElement(Route, { path: "/roadmaps", element: React.createElement(ProtectedRoute, {}, React.createElement(Roadmaps, {})) }),
          React.createElement(Route, { path: "/tracker", element: React.createElement(ProtectedRoute, {}, React.createElement(DayTracker, {})) }),
          React.createElement(Route, { path: "*", element: React.createElement(NotFound, {}) })
        )
      )
    )
  )
);

export default App;
