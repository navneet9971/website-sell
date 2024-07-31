"use client";

import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ModeToggle } from './ModeToggle';
import { Input } from "/components/ui/input";
import AddCart from '../NavbarComponent/CartComponent/AddCartShop/AddCart';
import AddLike from '../NavbarComponent/LikeComponent/AddLikeButton/AddLike';
import { useRouter } from 'next/navigation';
import { SignedIn, UserButton, UserProfile } from '@clerk/nextjs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ userId }) {
  const router = useRouter();

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const handleLogin = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 gap-20 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <Input
              className="w-60 h-8"
              placeholder="Search.."
            />
          </div>

          <div className='flex items-center justify-center gap-6'>
            <ModeToggle />
            {userId ? (
              <>
                <AddLike />
                <AddCart />
                
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <div>
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="relative rounded-md bg-gray-700 text-white px-3 py-2 text-sm hover:bg-gray-600"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="relative rounded-md bg-gray-700 text-white px-3 py-2 text-sm hover:bg-gray-600 ml-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Input
            className="w-60 h-8"
            placeholder="Search.."
          />
          <ModeToggle />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
