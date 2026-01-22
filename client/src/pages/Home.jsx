import Hero from "../components/home/Hero";
import FeaturedPerfumes from "../components/home/FeaturedPerfumes";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CustomPerfume from "../components/home/CustomPerfume";
import Aboutus from "../components/home/AboutUs";
import ContactUS from "../components/home/ContactUS";
import { HashLink } from "react-router-hash-link";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedPerfumes />
      <CustomPerfume />
      <WhyChooseUs />
      <Aboutus />
      <HashLink smooth to="/#contact">
        <ContactUS />
      </HashLink>
    </>
  );
}

export default Home;
