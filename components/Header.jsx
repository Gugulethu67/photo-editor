"use client";

import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LayoutDashboard, Sparkles } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from 'convex/react';

const AIPhotoEditorLogo = () => (
  <svg viewBox="0 0 320 100" className="h-12 w-auto md:h-14">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#6366f1", stopOpacity:1}} />
        <stop offset="50%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#ec4899", stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#06b6d4", stopOpacity:1}} />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Enhanced background with glow */}
    <circle cx="50" cy="50" r="40" fill="url(#gradient1)" opacity="0.15" filter="url(#glow)"/>
    
    {/* Main camera/lens icon - larger and more prominent */}
    <circle cx="50" cy="50" r="28" fill="none" stroke="url(#gradient1)" strokeWidth="4" filter="url(#glow)"/>
    <circle cx="50" cy="50" r="18" fill="url(#gradient1)" opacity="0.9"/>
    <circle cx="50" cy="50" r="10" fill="white" opacity="0.95"/>
    <circle cx="50" cy="50" r="4" fill="url(#gradient1)" opacity="0.7"/>
    
    {/* Enhanced AI sparkles/nodes - larger and more visible */}
    <circle cx="25" cy="25" r="3" fill="url(#gradient2)" filter="url(#glow)">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="75" cy="25" r="3" fill="url(#gradient2)" filter="url(#glow)">
      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="25" cy="75" r="3" fill="url(#gradient2)" filter="url(#glow)">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="75" cy="75" r="3" fill="url(#gradient2)" filter="url(#glow)">
      <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    
    {/* Additional corner sparkles for more AI feel */}
    <circle cx="15" cy="50" r="2" fill="url(#gradient2)" opacity="0.7">
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="85" cy="50" r="2" fill="url(#gradient2)" opacity="0.7">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    
    {/* Enhanced Text - larger and bolder */}
    <text x="110" y="35" fontFamily="Inter, Arial, sans-serif" fontSize="32" fontWeight="bold" fill="url(#gradient1)" filter="url(#glow)">AI</text>
    <text x="110" y="70" fontFamily="Inter, Arial, sans-serif" fontSize="18" fontWeight="600" fill="#ffffff" opacity="0.95">Photo Editor</text>
    
    {/* Enhanced connecting lines with glow */}
    <line x1="25" y1="25" x2="50" y2="50" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
      <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite"/>
    </line>
    <line x1="75" y1="25" x2="50" y2="50" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite"/>
    </line>
    <line x1="25" y1="75" x2="50" y2="50" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
    </line>
    <line x1="75" y1="75" x2="50" y2="50" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.4" filter="url(#glow)">
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.5s" repeatCount="indefinite"/>
    </line>
  </svg>
);

const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  if (path.includes("/editor")) {
    return null; // Hide header on editor page
  }

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="mr-10 md:mr-20">
          <AIPhotoEditorLogo />
        </Link>
        {path === "/" && (
          <div className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}

        {/* auth */}
        <div className='flex items-center gap-3 ml-10 md:ml-20'>
            <Unauthenticated>
              <SignInButton>
                <Button variant="glass" className="hidden sm:flex">
                Sign In
              </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="primary">Sign Up</Button>
              </SignUpButton>
            </Unauthenticated>
            <Authenticated>
              <Link href="/dashboard">
              <Button variant="glass" className="hidden sm:flex">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:flex">Dashboard</span>
              </Button>
            </Link>
              <UserButton />
            </Authenticated>
        </div>

        {isLoading && (
          <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
            <BarLoader width={"95%"} color="#06b6d4" />
          </div>
        )}

        </div>
        
    </header>
  )
}

export default Header