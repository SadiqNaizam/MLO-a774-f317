import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Github, Chrome } from 'lucide-react'; // Assuming these icons for social login

import AuthLayoutCard from '@/components/auth/AuthLayoutCard';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@example.com", // Default credential
      password: "password123",    // Default credential
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setError(null);
    console.log('Login form submitted:', data);
    // Simulate API call
    if (data.email === "test@example.com" && data.password === "password123") {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate('/'); // Redirect to homepage or dashboard
    } else {
      setError("Invalid email or password. Please try again.");
      form.resetField("password");
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    toast({
      title: `Login with ${provider}`,
      description: `Attempting to log in with ${provider}... (Not implemented)`,
    });
  };

  const footerContent = (
    <>
      <div className="text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </>
  );

  return (
    <AuthLayoutCard
      title="Welcome Back!"
      description="Sign in to continue to your account."
      footerContent={footerContent}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <SocialLoginButton
            providerName="Google"
            icon={Chrome}
            onClick={() => handleSocialLogin('Google')}
        />
        <SocialLoginButton
            providerName="GitHub"
            icon={Github}
            onClick={() => handleSocialLogin('GitHub')}
        />
      </div>
    </AuthLayoutCard>
  );
};

export default LoginPage;