"use client";

import { useUserContext } from "@/lib/contexts/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { use } from "react";

export function UserInfo() {
  const { userPromise } = useUserContext();
  const user = use(userPromise);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-4">
              <div className="size-12 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // if (error) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>User Information</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <p className="text-red-500">Error loading user data</p>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No user logged in</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="size-12">
            <AvatarImage alt={user.name || ""} />
            <AvatarFallback>
              {user.email
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.name || "No name"}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400">Role: {user.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
