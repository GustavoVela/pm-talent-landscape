import { Header } from "@/components/header"
import { Introduction } from "@/components/introduction"
import { AnalysisPipeline } from "@/components/analysis-pipeline"
import { DemographicsPhase } from "@/components/demographics-phase"
import { CompetencyProfilePhase } from "@/components/competency-profile-phase"
import { QuadrantPhase } from "@/components/quadrant-phase"
import { AiAdoptionPhase } from "@/components/ai-adoption-phase"
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
        <DemographicsPhase />
        <CompetencyProfilePhase />
        <QuadrantPhase />
        <AiAdoptionPhase />
        <ElephantInTheRoom />
        <Conclusion />
      </main>
      <Footer />
    </div>
  )
}
