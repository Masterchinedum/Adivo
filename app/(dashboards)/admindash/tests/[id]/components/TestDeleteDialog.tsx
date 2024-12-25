// // app/(dashboards)/admindash/tests/[id]/components/TestDeleteDialog.tsx
// 'use client'

// import * as React from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog'
// import { Button } from '@/components/ui/button'

// interface TestDeleteDialogProps {
//   id: string
//   title: string
// }

// export function TestDeleteDialog({ id, title }: TestDeleteDialogProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = React.useState(false)

//   async function onDelete() {
//     setIsLoading(true)
//     try {
//       const response = await fetch(`/api/admin/tests/${id}`, {
//         method: 'DELETE',
//       })

//       if (!response.ok) {
//         throw new Error('Failed to delete test')
//       }

//       toast.success('Test deleted successfully')
//       router.refresh()
//       router.push('/admindash/tests')
//     } catch (error) {
//       toast.error('Something went wrong')
//       console.error(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="destructive">Delete Test</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This will permanently delete &quot;{title}&quot; and all of its data.
//             This action cannot be undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={onDelete}
//             disabled={isLoading}
//             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//           >
//             {isLoading ? "Deleting..." : "Delete"}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }