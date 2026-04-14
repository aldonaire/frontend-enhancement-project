import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SocialBar, NameTag } from './components/SocialBar';

function App() {
  return (
    <>
      <Navbar />
      <SocialBar />
      <NameTag />
      <main>
        <Hero />
        <Destinations />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;