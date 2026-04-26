import { Header } from "@/components/header"
import { Introduction } from "@/components/introduction"
import { AnalysisPipeline } from "@/components/analysis-pipeline"
import { PhaseZero } from "@/components/phase-zero"
import { PhaseOne } from "@/components/phase-one"
import { PhaseTwo } from "@/components/phase-two"
import { PhaseThree } from "@/components/phase-three"
import { PhaseFour } from "@/components/phase-four"
import { PhaseFive } from "@/components/phase-five"
import { ElephantInTheRoom } from "@/components/elephant-in-the-room"
import { Conclusion } from "@/components/conclusion"
import { Footer } from "@/components/footer"
import { FloatingNav } from "@/components/floating-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <FloatingNav />
      <main className="flex-1">
        <Introduction />
        <AnalysisPipeline />
        <PhaseZero />
        <PhaseOne />
        <PhaseTwo />
        <PhaseThree />
        <PhaseFour />
        <PhaseFive />
        <ElephantInTheRoom />
        <Conclusion />
      </main>
      <Footer />
    </div>
  )
}
