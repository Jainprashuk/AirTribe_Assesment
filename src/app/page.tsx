import DndExample from "@/components/DndExample";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Home() {
  return (
    <main className="bg-gray-950 text-white">
      <Header/>
      <DndExample />
      <Footer/>

    </main>
  )
}