import React from 'react';
import { Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from 'lucide-react';

const navLinks = [
  { name: "Roast My CV", href: "/roaster" },
  { name: "Templates", href: "/templates" },
  { name: "Tips", href: "/tips" },
  { name: "Format Checker", href: "/format-checker" },
  { name: "Progress Tracker", href: "/progress" },
  { name: "Keyword Analyzer", href: "/keyword-analyzer" },
  { name: "Timeline Builder", href: "/timeline-builder" },
  { name: "Power Words", href: "/power-words" }
];

const NavBar: React.FC = () => {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Lovable
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              {isSignedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.imageUrl} alt={user?.firstName || "Avatar"} />
                        <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</span>
                        <span className="text-xs leading-none text-muted-foreground">
                          {user?.emailAddresses[0].emailAddress}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/sign-in">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
