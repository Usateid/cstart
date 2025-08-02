import { Suspense } from "react";
import Register from "../sign-up/_component/form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-12 sm:mx-auto sm:w-full sm:max-w-sm">
      <Suspense>
        <Register />
      </Suspense>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">
            Already have an account?
          </span>
        </div>
      </div>
      <Link
        href={"/sign-in"}
        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Login
      </Link>
    </div>
  );
}
