
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ModeToggle } from '../ui/ModeToggle';
import { Input } from "../ui/input";
import AddCart from '../Navbar/NavbarComponent/CartComponent/AddCartShop/AddCart';
import AddLike from '../Navbar/NavbarComponent/LikeComponent/AddLikeButton/AddLike';
import { useNavigate } from 'react-router-dom';
import UserAvater from "./NavbarComponent/UserAvater/UserAvater"
import Cookies from 'js-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Navbar() {
  const navigate = useNavigate();
  const userId = Cookies.get("userId")

  const handleLogin = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
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
              <LazyLoadImage
                effect="blur"
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

          <div className="flex items-center justify-center gap-6">
            {/* <ModeToggle /> */}
            {userId ? (
              <>
                <AddLike />
                <AddCart />
                <div>
                  <UserAvater />
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
                  Sign in
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="p-[2px] rounded-lg transition duration-300 group">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Input
              className="w-60 h-8"
              placeholder="Search.."
            />
            <ModeToggle />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
