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
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
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
      {/* Temple Base with Total Score */}
      <div className="absolute bottom-0 w-full h-[12%] bg-gradient-to-b from-stone-200 to-stone-300 rounded-md shadow-lg marble-texture">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-stone-800">
              Overall: {percentageScore.toFixed(1)}%
            </div>
            <div className="text-sm text-stone-600">
              Score: {totalScore.toFixed(1)} / {maxScore}
            </div>
          </div>
        </div>
      </div>

      {/* Temple Steps */}
      <div className="absolute bottom-[12%] w-[95%] left-[2.5%] h-[6%] bg-gradient-to-b from-stone-100 to-stone-200 rounded-t-sm shadow-md marble-texture" />
      <div className="absolute bottom-[18%] w-[90%] left-[5%] h-[6%] bg-gradient-to-b from-stone-50 to-stone-100 rounded-t-sm shadow-md marble-texture" />

      {/* Pillars Section */}
      <div 
        className="absolute bottom-[24%] w-full h-[56%] flex justify-center items-end gap-4 px-12"
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
            {/* Pillar Capital */}
            <div className="w-full h-[10%] bg-gradient-to-b from-stone-100 to-stone-200 rounded-t-sm shadow-md marble-texture" />
            
            {/* Pillar Body */}
            <div className="relative w-full h-[80%] bg-gradient-to-b from-stone-50 to-stone-100 rounded-sm overflow-hidden pillar-texture">
              <motion.div 
                className="absolute bottom-0 w-full rounded-sm"
                style={{ 
                  backgroundColor: PILLAR_COLORS[index % PILLAR_COLORS.length],
                  height: `${(score.actualScore / score.maxScale) * 100}%`,
                  opacity: 0.85
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(score.actualScore / score.maxScale) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
              </motion.div>

              {/* Centered Percentage Score */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-white/80 px-3 py-1.5 rounded-full shadow-lg"
                >
                  <span className="text-xl font-bold text-stone-800">
                    {((score.actualScore / score.maxScale) * 100).toFixed(1)}%
                  </span>
                </motion.div>
              </div>
            </div>
            
            {/* Pillar Base */}
            <div className="w-full h-[10%] bg-gradient-to-b from-stone-200 to-stone-300 rounded-b-sm shadow-md marble-texture" />

            {/* Category Name */}
            <div className="absolute bottom-[-2.5rem] text-center text-sm font-medium w-full px-1">
              <span className="bg-white/80 px-2 py-1 rounded shadow-sm">
                {score.category.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Temple Roof with Test Title */}
      <motion.div 
        className="absolute top-[5%] w-[95%] left-[2.5%] h-[15%]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full bg-gradient-to-b from-stone-100 to-stone-200 clip-triangle shadow-lg marble-texture">
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10" />
          <h2 className="absolute inset-0 flex items-center justify-center text-xl font-bold text-stone-800 px-4 text-center">
            {title}
          </h2>
        </div>
      </motion.div>
    </div>
  )
}