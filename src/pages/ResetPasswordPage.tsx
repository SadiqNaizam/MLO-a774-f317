import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthLayoutCard from '@/components/auth/AuthLayoutCard';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
  console.log('ResetPasswordPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Example: extract token from URL
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Effect to check for token (basic example)
  React.useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.");
      toast({
        title: "Invalid Token",
        description: "The password reset link is invalid or has expired.",
        variant: "destructive",
      });
    }
  }, [token, toast]);


  const onSubmit = (data: ResetPasswordFormValues) => {
    setError(null);
    if (!token) {
        setError("Cannot reset password without a valid token.");
        return;
    }
    console.log('Reset password form submitted:', data, 'with token:', token);
    // Simulate API call for password reset
    toast({
      title: "Password Reset Successful!",
      description: "Your password has been changed. You can now log in with your new password.",
    });
    navigate('/login');
  };

  return (
    <AuthLayoutCard
      title="Reset Your Password"
      description="Enter your new password below."
      showLogo={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={!token} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={!token} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={!token}>
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthLayoutCard>
  );
};

export default ResetPasswordPage;