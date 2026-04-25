import { Header } from "@/components/header"
import { Introduction } from "@/components/introduction"
import { TableOfContents, type TocItem } from "@/components/table-of-contents"
import { ChartsSection } from "@/components/charts-section"
import { Footer } from "@/components/footer"
import { FloatingNav } from "@/components/floating-nav"

// Esta lista se actualizará conforme se agreguen gráficas
const tableOfContentsItems: TocItem[] = [
  // Ejemplo de cómo se agregarán items:
  // {
  //   id: "chart-salarios",
  //   title: "Distribución de Salarios",
  //   description: "Análisis de rangos salariales por nivel de experiencia"
  // },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <FloatingNav />
      <main className="flex-1">
        <Introduction />
        <TableOfContents items={tableOfContentsItems} />
        <ChartsSection />
      </main>
      <Footer />
    </div>
  )
}
