// // app/(dashboards)/admindash/tests/[id]/components/TestStatusBar.tsx
// 'use client'

// import { formatDate } from '@/lib/utils'
// import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator'
// import type { Test } from '@/types/tests/test'

// interface TestStatusBarProps {
//   test: Test
// }

// export function TestStatusBar({ test }: TestStatusBarProps) {
//   return (
//     <div className="flex items-center justify-between rounded-lg border p-4">
//       <div className="flex items-center space-x-4">
//         <div className="space-y-1">
//           <p className="text-sm font-medium leading-none">Status</p>
//           <Badge variant={test.isPublished ? "default" : "secondary"}>
//             {test.isPublished ? "Published" : "Draft"}
//           </Badge>
//         </div>
//         <Separator orientation="vertical" className="h-8" />
//         <div className="space-y-1">
//           <p className="text-sm font-medium leading-none">Created</p>
//           <p className="text-sm text-muted-foreground">
//             {formatDate(test.createdAt)}
//           </p>
//         </div>
//         <Separator orientation="vertical" className="h-8" />
//         <div className="space-y-1">
//           <p className="text-sm font-medium leading-none">Last Updated</p>
//           <p className="text-sm text-muted-foreground">
//             {formatDate(test.updatedAt)}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }