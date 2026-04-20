import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "@/auth/authContext";
import { NotesProvider } from "@/store/notesContext";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { NoteLayout } from "@/layouts/NoteLayout";
import { GuestLayout } from "@/layouts/GuestLayout";
import { NotesListPage } from "@/pages/NotesListPage";
import { NoteDetailPage } from "@/pages/NoteDetailPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { GuestOnlyRoute, ProtectedRoute } from "@/components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DefaultLayout>
                    <NotesListPage />
                  </DefaultLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/note/:id"
              element={
                <ProtectedRoute>
                  <NoteLayout>
                    <NoteDetailPage />
                  </NoteLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <GuestLayout title="Welcome back" subtitle="Sign in to continue to your notes.">
                    <LoginPage />
                  </GuestLayout>
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestOnlyRoute>
                  <GuestLayout title="Create an account" subtitle="Start organizing your notes.">
                    <RegisterPage />
                  </GuestLayout>
                </GuestOnlyRoute>
              }
            />
            <Route
              path="*"
              element={
                <NoteLayout>
                  <NotFoundPage />
                </NoteLayout>
              }
            />
          </Routes>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
