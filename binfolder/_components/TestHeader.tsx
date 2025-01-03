// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestHeader.tsx
export function TestHeader({ totalQuestions, answeredQuestions }: { 
  totalQuestions: number
  answeredQuestions: number 
}) {
  const progress = Math.round((answeredQuestions / totalQuestions) * 100)
  
  return (
    <div className="bg-white border-b px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Test in Progress</h1>
          <p className="text-sm text-muted-foreground">
            {answeredQuestions} of {totalQuestions} questions answered
          </p>
        </div>
        <div className="w-48">
          <div className="bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}