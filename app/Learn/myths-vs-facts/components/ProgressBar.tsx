"use client"

interface ProgressBarProps {
  currentMyth: number
  totalMyths: number
  className?: string
}

export function ProgressBar({ currentMyth, totalMyths, className = "" }: ProgressBarProps) {
  const progress = (currentMyth / totalMyths) * 100

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Myth {currentMyth} of {totalMyths}
        </span>
        <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentMyth}
          aria-valuemin={0}
          aria-valuemax={totalMyths}
        />
      </div>
    </div>
  )
}

