import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import Auth from "./Auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersContext from "./Auth/ContextAPI/UsersApi/UsersContext";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsersContext>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </UsersContext>
    </QueryClientProvider>
  </StrictMode>
);
