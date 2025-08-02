import { z } from "zod";
import { TeamDataWithMembers, User } from "@/lib/db/schema";
import { getTeamForUser, getUser } from "@/lib/db/queries";
import { redirect } from "next/navigation";

export type ActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>; // Errori specifici per campo
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const formDataObj = Object.fromEntries(formData);
    const result = schema.safeParse(formDataObj);
    if (!result.success) {
      // Mappa gli errori di validazione ai campi specifici
      const fieldErrors: ActionState["fieldErrors"] = {};
      result.error.errors.forEach((error) => {
        const fieldName = error.path.join(".");
        fieldErrors[fieldName] = error.message;
      });

      return {
        error: result.error.errors[0].message,
        fieldErrors,
        ...formDataObj,
      };
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      // Mappa gli errori di validazione ai campi specifici
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const fieldName = error.path.join(".");
        fieldErrors[fieldName] = error.message;
      });

      return {
        error: result.error.errors[0].message,
        fieldErrors,
      };
    }

    return action(result.data, formData, user);
  };
}

type ActionWithTeamFunction<T> = (
  formData: FormData,
  team: TeamDataWithMembers
) => Promise<T>;

export function withTeam<T>(action: ActionWithTeamFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect("/sign-in");
    }

    const team = await getTeamForUser();
    if (!team) {
      throw new Error("Team not found");
    }

    return action(formData, team);
  };
}
