import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { BaseButton } from "@/components/BaseButton";
import { BaseTextField } from "@/components/BaseTextField";
import { useAuth } from "@/auth/authContext";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = usernameOrEmail.trim() !== "" && password !== "" && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await login(usernameOrEmail.trim(), password);
      const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BaseTextField
        value={usernameOrEmail}
        onChange={setUsernameOrEmail}
        label="Username or email"
        placeholder="you@example.com"
        autoComplete="username"
      />
      <BaseTextField
        value={password}
        onChange={setPassword}
        label="Password"
        type="password"
        placeholder="Your password"
        autoComplete="current-password"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <BaseButton
        type="submit"
        text={submitting ? "Signing in…" : "Sign in"}
        size="large"
        variant="solid"
        color="primary"
        disabled={!canSubmit}
        className="w-full"
      />

      <p className="text-sm text-gray-600 text-center pt-2">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
          Create one
        </Link>
      </p>
    </form>
  );
}
