"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const { signUpWithEmail, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUpWithEmail(email, password);
      router.push("/"); // redirect after sign up
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center p-4">Checking session...</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </form>

      <div className="my-4 text-center text-sm text-gray-500">OR</div>

      <Button
        variant="outline"
        onClick={signInWithGoogle}
        className="flex items-center justify-center"
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 533.5 544.3">
          <path
            fill="#4285F4"
            d="M533.5 278.4c0-17.8-1.5-35-4.3-51.6H272v97.8h147.1c-6.4 34-25.6 62.9-54.8 82.3v68.2h88.7c51.9-47.8 81.5-118 81.5-196.7z"
          />
          <path
            fill="#34A853"
            d="M272 544.3c73.6 0 135.4-24.3 180.6-65.9l-88.7-68.2c-24.6 16.5-56 26.1-91.9 26.1-70.6 0-130.3-47.6-151.7-111.4H30.5v69.9C75.7 488.3 166.2 544.3 272 544.3z"
          />
          <path
            fill="#FBBC05"
            d="M120.3 326.9c-5.3-16-8.3-33-8.3-50.4s3-34.4 8.3-50.4v-69.9H30.5c-18.8 37.3-29.5 79.2-29.5 120.3s10.7 83 29.5 120.3l89.8-69.9z"
          />
          <path
            fill="#EA4335"
            d="M272 107.7c39.8-.6 75 13.6 102.8 39.8l77-77C407.4 24.3 345.6 0 272 0 166.2 0 75.7 56 30.5 144.7l89.8 69.9c21.4-63.8 81.1-111.4 151.7-107z"
          />
        </svg>
        Sign Up with Google
      </Button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
