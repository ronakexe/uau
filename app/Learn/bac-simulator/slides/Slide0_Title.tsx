"use client"

import { useEffect } from "react"
import { ArrowRight } from "lucide-react"

export function Slide0_Title() {
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Slide0_Title.tsx:9',message:'Slide0_Title mounted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    return () => {
      fetch('http://127.0.0.1:7242/ingest/938c7e20-ba6b-40b5-a08a-495b85ed855f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Slide0_Title.tsx:12',message:'Slide0_Title unmounted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    }
  }, [])
  // #endregion
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          BAC Impact Simulator
        </h1>
        <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
          Understanding Alcohol & Impairment
        </p>
        <p className="mb-12 text-lg text-muted-foreground">
          An interactive workshop on how alcohol affects your body and decision-making
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <span>Click Next or press → to begin</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
