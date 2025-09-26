"use client";

import { useEffect, useState } from "react";
import type { User } from "@/lib/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, User as UserIcon, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function UserTable() {
  const [users, setUsers] = useState<Omit<User, 'password_hash'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  
  const RoleIcon = ({ role }: { role: 'admin' | 'user' }) => {
    if (role === 'admin') {
        return <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />;
    }
    return <UserIcon className="mr-2 h-5 w-5 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
       <Card className="bg-destructive/10 border-destructive">
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle/> Error
            </CardTitle>
         </CardHeader>
         <CardContent>
            <p>{error}</p>
         </CardContent>
       </Card>
    );
  }
  
  if (currentUser?.role !== 'admin') {
      return (
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You do not have permission to view this page.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Only users with the 'admin' role can view the user list.</p>
            </CardContent>
          </Card>
      )
  }

  return (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={`${user.role === 'admin' && 'bg-primary text-primary-foreground'}`}>
                        <div className="flex items-center">
                            <RoleIcon role={user.role} />
                            <span className="capitalize">{user.role}</span>
                        </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
