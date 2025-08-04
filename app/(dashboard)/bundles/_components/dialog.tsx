"use client";
import { use } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bundle } from "@/lib/db/schema";
import { useUserContext } from "@/lib/contexts/user-context";
import { Button } from "@/components/ui/button";
import createBooking from "../_actions";
// import { getActiveBundles } from "@/lib/db/queries/bundle";

export default function DialogBooking({ bundle }: { bundle: Bundle }) {
  const { userPromise } = useUserContext();
  const user = use(userPromise);
  if (!user) {
    return <div>error</div>;
  }
  // const userActiveBundles = getActiveBundles(user?.id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className=" pb-4">Prenota un pacchetto</DialogTitle>
          <DialogDescription>
            Hai scelto il pacchetto {bundle.name}
          </DialogDescription>
          <DialogDescription>
            Questo ti permette di accedere a tutte le attività del centro
            sportivo per un mese
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <DialogDescription>
            Attualmente non hai altri pacchetti attivi
          </DialogDescription>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancella</Button>
          </DialogClose>
          {user && (
            <Button
              onClick={() => createBooking(bundle.id.toString(), user.id)}
            >
              Prenota
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
