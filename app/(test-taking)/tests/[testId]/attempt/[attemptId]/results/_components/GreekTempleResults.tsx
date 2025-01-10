// app/(test-taking)/tests/[testId]/attempt/[attemptId]/results/_components/GreekTempleResults.tsx
"use client"

import { motion } from "framer-motion"

interface GreekTempleResultsProps {
  title: string
  categoryScores: Array<{
    categoryId: string
    category: {
      name: string
      description?: string | null
    }
    actualScore: number
    maxScale: number
  }>
  totalScore: number
  maxScore: number
  percentageScore: number
}

const PILLAR_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(var(--card))"
]

export function GreekTempleResults({ 
  title,
  categoryScores,
  totalScore,
  maxScore,
  percentageScore 
}: GreekTempleResultsProps) {
  const pillarsCount = categoryScores.length
  const templeWidth = Math.min(1200, Math.max(400, pillarsCount * 150))

  return (
    <div className="w-full aspect-[16/9] relative">
      {/* Temple Base */}
      <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-b from-stone-300 to-stone-400 rounded-md shadow-lg" />
      
      {/* Temple Steps */}
      <div className="absolute bottom-[10%] w-[95%] left-[2.5%] h-[5%] bg-stone-200 rounded-t-sm shadow-md" />
      <div className="absolute bottom-[15%] w-[90%] left-[5%] h-[5%] bg-stone-300 rounded-t-sm shadow-md" />

      {/* Pillars */}
      <div 
        className="absolute bottom-[20%] w-full h-[60%] flex justify-center items-end gap-4 px-12"
        style={{ maxWidth: `${templeWidth}px`, left: '50%', transform: 'translateX(-50%)' }}
      >
        {categoryScores.map((score, index) => (
          <motion.div
            key={score.categoryId}
            className="relative w-full h-full flex flex-col items-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Pillar Cap */}
            <div className="w-full h-[8%] bg-stone-200 rounded-t-sm shadow-md" />
            
            {/* Pillar Body */}
            <div className="relative w-full h-[84%] bg-stone-100 rounded-sm overflow-hidden">
              <motion.div 
                className="absolute bottom-0 w-full rounded-sm"
                style={{ 
                  backgroundColor: PILLAR_COLORS[index % PILLAR_COLORS.length],
                  height: `${(score.actualScore / score.maxScale) * 100}%`
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(score.actualScore / score.maxScale) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
            
            {/* Pillar Base */}
            <div className="w-full h-[8%] bg-stone-300 rounded-b-sm shadow-md" />

            {/* Category Name */}
            <div className="absolute bottom-[-2rem] text-center text-sm font-medium w-full px-1">
              {score.category.name}
            </div>
            
            {/* Score Percentage */}
            <div className="absolute top-[-2rem] text-center font-bold w-full px-1">
              {((score.actualScore / score.maxScale) * 100).toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>

      {/* Temple Roof */}
      <motion.div 
        className="absolute top-[5%] w-[95%] left-[2.5%] h-[15%]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Roof Triangle */}
        <div className="relative w-full h-full bg-gradient-to-b from-stone-200 to-stone-300 clip-triangle shadow-lg flex items-center justify-center">
          <h2 className="text-xl font-bold text-stone-700 px-4 text-center">
            {title}
          </h2>
        </div>
      </motion.div>
    </div>
  )
}