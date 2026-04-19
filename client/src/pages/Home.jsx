import Hero from "../components/Hero";
import Collection from "../components/Collection";
import GrowPlant from "../components/GrowPlant";
import CareSteps from "../components/CareSteps";
import ContactSection from "../components/ContactSection";

function Home() {
  return (
    <div className="w-full">

      <Hero />

      <Collection />

      <GrowPlant />

      <CareSteps />

      <ContactSection />

    </div>
  );
}

export default Home;