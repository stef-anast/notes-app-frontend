import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BaseButton } from "@/components/BaseButton";
import { BaseTextField } from "@/components/BaseTextField";
import { useAuth } from "@/auth/authContext";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const usernameValid = /^[A-Za-z0-9_.-]{3,64}$/.test(username);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;
  const canSubmit = usernameValid && emailValid && passwordValid && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await register(username, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BaseTextField
        value={username}
        onChange={setUsername}
        label="Username"
        placeholder="e.g. alice"
        supportingText="3–64 chars: letters, digits, . _ -"
        autoComplete="username"
      />
      <BaseTextField
        value={email}
        onChange={setEmail}
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
      />
      <BaseTextField
        value={password}
        onChange={setPassword}
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <BaseButton
        type="submit"
        text={submitting ? "Creating account…" : "Create account"}
        size="large"
        variant="solid"
        color="primary"
        disabled={!canSubmit}
        className="w-full"
      />

      <p className="text-sm text-gray-600 text-center pt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}
