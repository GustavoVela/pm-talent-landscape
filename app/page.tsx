import { Header } from "@/components/header"
import { Introduction } from "@/components/introduction"

import { DemographicsPhase } from "@/components/demographics-phase"
import { CompetencyProfilePhase } from "@/components/competency-profile-phase"
import { ClosingPhase } from "@/components/closing-phase"
import { Footer } from "@/components/footer"
import { FloatingNav } from "@/components/floating-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <FloatingNav />
      <main className="flex-1">
        <Introduction />
        <DemographicsPhase />
        <CompetencyProfilePhase />
        <ClosingPhase />
      </main>
      <Footer />
    </div>
  )
}
