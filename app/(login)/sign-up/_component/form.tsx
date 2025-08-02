"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleIcon, Loader2 } from "lucide-react";
import { signUp } from "@/app/(login)/actions";
import { ActionState } from "@/lib/auth/middleware";

// Componente helper per mostrare errori per campo
function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <div className="text-red-500 text-sm mt-1">{error}</div>;
}

export default function Register() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const inviteId = searchParams.get("inviteId");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signUp,
    { fieldErrors: {} }
  );

  return (
    <form className="space-y-2" action={formAction}>
      <input type="hidden" name="redirect" value={redirect || ""} />
      <input type="hidden" name="priceId" value={priceId || ""} />
      <input type="hidden" name="inviteId" value={inviteId || ""} />

      <div>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={state.name}
          required
          maxLength={50}
          placeholder="Come ti chiami?"
          className={state.fieldErrors?.name ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.name} />
      </div>

      <div>
        <Input
          id="surname"
          name="surname"
          type="text"
          autoComplete="surname"
          defaultValue={state.surname}
          required
          maxLength={50}
          placeholder="Il tuo cognome?"
          className={state.fieldErrors?.surname ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.surname} />
      </div>

      <div>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          autoComplete="birthDate"
          defaultValue={state.birthDate}
          required
          maxLength={50}
          placeholder="Quando sei nato?"
          className={state.fieldErrors?.birthDate ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.birthDate} />
      </div>

      <div>
        <Input
          id="taxCode"
          name="taxCode"
          type="text"
          autoComplete="taxCode"
          defaultValue={state.taxCode}
          required
          maxLength={16}
          placeholder="Il tuo codice fiscale?"
          className={state.fieldErrors?.taxCode ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.taxCode} />
      </div>

      <div>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          autoComplete="phoneNumber"
          defaultValue={state.phoneNumber}
          required
          maxLength={50}
          placeholder="Il tuo numero di telefono?"
          className={state.fieldErrors?.phoneNumber ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.phoneNumber} />
      </div>

      <div>
        <Input
          id="address"
          name="address"
          type="text"
          autoComplete="address"
          defaultValue={state.address}
          required
          maxLength={50}
          placeholder="Dove abiti?"
          className={state.fieldErrors?.address ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.address} />
      </div>

      <div>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.email}
          required
          maxLength={50}
          placeholder="Enter your email"
          className={state.fieldErrors?.email ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.email} />
      </div>

      <div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          defaultValue={state.password}
          required
          minLength={8}
          maxLength={100}
          placeholder="Enter your password"
          className={state.fieldErrors?.password ? "border-red-500" : ""}
        />
        <FieldError error={state.fieldErrors?.password} />
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
            "Sign up"
          )}
        </Button>
      </div>
    </form>
  );
}
