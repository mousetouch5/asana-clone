import EighthSection from "./EighthSection/page";
import FifthSection from "./FifthSection/page";
import FirstSection from "./FirstSection/page";
import FourthSection from "./FourthSection/page";
import Navbar from "./Navbar/navbar";
import SecondSection from "./SecondSection/page";
import SeventhSection from "./SeventhSection/page";
import SixthSection from "./SixthSection/page";
import ThirdSection from "./ThirdSection/page";
import Footer from "./footer/page";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <FirstSection />
      <SecondSection />
      <FifthSection />
      <SeventhSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
