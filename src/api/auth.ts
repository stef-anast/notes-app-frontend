import { apiRequest } from "./client";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresInMinutes: number;
  userId: number;
  username: string;
  email: string;
}

export function toUser(res: AuthResponse): AuthUser {
  return { id: res.userId, username: res.username, email: res.email };
}

export function login(usernameOrEmail: string, password: string) {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: { usernameOrEmail, password },
    auth: false,
  });
}

export function register(username: string, email: string, password: string) {
  return apiRequest<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: { username, email, password },
    auth: false,
  });
}

export function me() {
  return apiRequest<AuthUser>("/api/auth/me");
}
