
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from './Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileText, Menu, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Group related features into logical categories
  const navGroups = [
    {
      title: "Resume Tools",
      items: [
        { name: "Roast My CV", href: "/roaster", description: "Get AI feedback on your resume" },
        { name: "Format Checker", href: "/format-checker", description: "Verify your resume format" },
        { name: "Keyword Analyzer", href: "/keyword-analyzer", description: "Match resume keywords to job descriptions" },
        { name: "Resume Analytics", href: "/resume-analytics", description: "Analyze text statistics and readability" },
        { name: "Contact Validator", href: "/contact-validator", description: "Validate contact information format" },
      ]
    },
    {
      title: "Design Tools",
      items: [
        { name: "Templates", href: "/templates", description: "Professional resume templates" },
        { name: "Color Palettes", href: "/color-palettes", description: "Professional color schemes" },
        { name: "Font Pairing", href: "/font-pairing", description: "Typography combinations" },
        { name: "Power Words", href: "/power-words", description: "Impact words for your resume" },
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Tips Library", href: "/tips", description: "Expert resume writing tips" },
        { name: "Progress Tracker", href: "/progress", description: "Track your resume improvements" },
        { name: "Timeline Builder", href: "/timeline-builder", description: "Create professional timelines" },
        { name: "Technical Report", href: "/technical-report", description: "Project technical documentation" },
      ]
    }
  ];

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo variant="small" showText={false} className="mr-2" />
              <span className="text-xl font-semibold text-gray-800">Resume Roaster</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navGroups.map((group) => (
                  <NavigationMenuItem key={group.title}>
                    <NavigationMenuTrigger className="bg-transparent">{group.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {group.items.map((item) => (
                          <ListItem 
                            key={item.name} 
                            title={item.name} 
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* User Authentication & Mobile Menu */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="md:hidden flex">
              <Button 
                variant="ghost" 
                className="mr-2" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu />
              </Button>
            </div>
            
            {/* Authentication */}
            <div className="ml-4">
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
                <div className="flex items-center">
                  <Link to="/sign-in">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            {navGroups.map((group) => (
              <div key={group.title} className="mt-3">
                <div className="px-2 text-sm font-medium text-gray-600">{group.title}</div>
                <div className="mt-1">
                  {group.items.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.href} 
                      className="block px-3 py-2 text-base rounded-md hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
