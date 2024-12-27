//app/(dashboards)/admindash/page.tsx

import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div>
        Hello this is the admin dashboard, It has button
        <Button > <Link href="/admindash/tests">Test list page</Link></Button>
    </div>
  )
}

export default page