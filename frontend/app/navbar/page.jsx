import Navbar from '/components/ui/Navbar'
import React from 'react'

import { auth, currentUser } from "@clerk/nextjs/server";

const NavbarPage = async () => {
 const { userId } = auth();

  return (
 <Navbar 
 userId={userId} 
 />
  )
}

export default NavbarPage;