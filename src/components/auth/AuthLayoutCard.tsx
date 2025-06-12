import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import LogoDisplay from './LogoDisplay'; // Import the LogoDisplay component

interface AuthLayoutCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  showLogo?: boolean;
  className?: string;
}

const AuthLayoutCard: React.FC<AuthLayoutCardProps> = ({
  title,
  description,
  children,
  footerContent,
  showLogo = true,
  className,
}) => {
  console.log("Rendering AuthLayoutCard with title:", title);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className={`w-full max-w-md shadow-lg ${className}`}>
        {showLogo && (
          <CardHeader className="items-center pb-4">
            <LogoDisplay size="md" />
          </CardHeader>
        )}
        <CardHeader className={showLogo ? "pt-0 text-center" : "text-center"}>
          <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center space-y-2">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthLayoutCard;