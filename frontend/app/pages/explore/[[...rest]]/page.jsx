import ExplorePage from '@/pages/ExplorePage'
import React from 'react'
import { auth } from "@clerk/nextjs/server";

const Explore = () => {
    const { userId } = auth();

  return (
    <ExplorePage 
    userId = {userId}
    />
  )
}

export default Explore