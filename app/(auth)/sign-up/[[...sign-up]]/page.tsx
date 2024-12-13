import { SignUp } from "@clerk/nextjs";

import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center p-5">
        <SignUp />
    </div>
  )
}

export default page