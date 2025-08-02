"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "@/app/(login)/actions";
import { ActionState } from "@/lib/auth/middleware";

// Componente helper per mostrare errori per campo
function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <div className="text-red-500 text-sm mt-1">{error}</div>;
}

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const inviteId = searchParams.get("inviteId");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,
    { error: "" }
  );

  return (
    <form className="space-y-6" action={formAction}>
      <input type="hidden" name="redirect" value={redirect || ""} />
      <input type="hidden" name="priceId" value={priceId || ""} />
      <input type="hidden" name="inviteId" value={inviteId || ""} />
      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.email}
            required
            maxLength={50}
            className={`appearance-none rounded-full relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm ${
              state.fieldErrors?.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          <FieldError error={state.fieldErrors?.email} />
        </div>
      </div>
      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            defaultValue={state.password}
            required
            minLength={8}
            maxLength={100}
            className={`appearance-none rounded-full relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm ${
              state.fieldErrors?.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          <FieldError error={state.fieldErrors?.password} />
        </div>
      </div>

      {/* Mostra errori generici solo se non ci sono errori specifici per campo */}
      {state?.error && !state.fieldErrors && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <div>
        <Button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Loading...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </form>
  );
}
