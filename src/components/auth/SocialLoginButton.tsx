import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react'; // For typing the icon prop

interface SocialLoginButtonProps extends ButtonProps {
  providerName: string;
  icon?: LucideIcon; // Optional: Pass the icon component directly
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  providerName,
  icon: Icon,
  onClick,
  className,
  variant = 'outline',
  ...props
}) => {
  console.log("Rendering SocialLoginButton for:", providerName);

  return (
    <Button
      variant={variant}
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>Sign in with {providerName}</span>
    </Button>
  );
};

export default SocialLoginButton;