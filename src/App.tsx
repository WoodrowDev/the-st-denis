import { MailingListForm } from './components/MailingListForm';

function App() {
  return (
    <div className="min-h-screen bg-st-denis-cream">
      {/* Hero Section with Logo and Coming Soon */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Marbled Background */}
        <div 
          className="absolute inset-0 opacity-90 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/MarbledEndPage_light_teal.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
          }}
        />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center space-y-8">
          {/* Downtown Columbus Tag */}
          <p className="text-sm md:text-base lg:text-lg font-bold tracking-widest text-st-denis-burgundy/90 font-sans uppercase">
            Downtown Columbus, IN
          </p>

          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/images/St__Denis_Final_No_Line_06.svg" 
              alt="St. Denis Logo" 
              className="w-64 h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain"
            />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 md:gap-8 pt-0">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src="/images/Socials_01.svg" alt="Instagram" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <img src="/images/Socials_02.svg" alt="Facebook" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
            </a>
            <a 
              href="mailto:Robert%20Schwartzkopf%20%3Cbaschwartzkopf%40sbcglobal.net%3E"
              className="hover:opacity-70 transition-opacity"
            >
              <img src="/images/Socials_03.svg" alt="Email" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
            </a>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 md:py-20 lg:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans uppercase font-light text-st-denis-burgundy tracking-wide pb-8">
            COMING SOON!
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-st-denis-burgundy font-bold">
            426 Washington Street
          </p>
          <p className="text-base md:text-xl lg:text-2xl text-st-denis-burgundy font-bold">
            Columbus, Indiana
          </p>
        </div>
      </section>

      {/* Mailing List Section */}
      <section 
        className="py-20 md:py-24 px-4 relative"
        style={{
          backgroundImage: 'url(/images/MarbledEndPage_light_teal.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-st-denis-burgundy">
            Join Our MAILING LIST
          </h2>
          <MailingListForm />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-st-denis-burgundy text-center mb-8">
            Cheers, and Welcome to St. Denis!
          </h2>
          
          <div className="prose prose-base md:prose-lg lg:prose-xl max-w-none text-st-denis-burgundy/80 space-y-6">
            <p>
              Nestled in the heart of downtown Columbus, Indiana, St. Denis is your cozy nook to slow down, savor, and stay awhile.
            </p>
            
            <p>
              A boutique haven for fine wine lovers and vintage book collectors, St. Denis is more than just a space, it's a mood. Equal parts stylish living room and neighborhood anchor, it's designed for every kind of moment...
            </p>

            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start">
                <span className="text-st-denis-teal mr-2">•</span>
                <span>A solo escape with a rare book and a bold red.</span>
              </li>
              <li className="flex items-start">
                <span className="text-st-denis-teal mr-2">•</span>
                <span>A spontaneous hangout with friends over a bottle.</span>
              </li>
              <li className="flex items-start">
                <span className="text-st-denis-teal mr-2">•</span>
                <span>A curious wander through art, stories, and design.</span>
              </li>
            </ul>

            <p>
              Each visit feels new. That cozy lamp you're reading under? The chair you're curled up in? The artwork catching your eye? It's all for sale, because St. Denis is an ever-evolving experience. Part boutique, part gallery, part wine bar.
            </p>

            <p>
              Enjoy curated wines by the glass or bottle, paired with thoughtful light snacks. Whether you're beginning your night, in between events, or ending your day, St. Denis is a place to connect—with stories, style, and the people around you.
            </p>

            <p className="font-semibold text-st-denis-burgundy">
              Come curious. Leave inspired.
            </p>

            <p className="italic">
              Cheers to new friends and favorite finds, only at St. Denis.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section 
        className="py-20 md:py-24 px-4 relative"
        style={{
          backgroundImage: 'url(/images/Multicolor_SVG.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          
          
          <div className="bg-st-denis-cream/90 backdrop-blur-sm rounded-lg p-8 md:p-12 space-y-6 text-base md:text-lg lg:text-xl text-st-denis-burgundy/80">
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light text-st-denis-burgundy text-center mb-12">
              Meet the Founders
            </h2>
            <p>
              Hi, we're Bob and Sarah, the couple behind St. Denis: Wine, Books, and Wonders. We're absolutely thrilled to bring our vision to life in the heart of downtown Columbus, Indiana. After decades in the design world, Bob as an architect, and Sarah as an interior designer, we decided it was time for something new. Or maybe something old: the passions that always brought us joy - books, wine, and beautifully curious things.
            </p>

            <p>
              St. Denis is our toast to creativity, connection, and community. We imagine a space where curiosity is welcome, conversations flow easily, and every day holds the chance to meet someone truly interesting. A stylish, cozy, ever-changing space where you can come curious and leave inspired.
            </p>

            <p>
              After years of commuting to Indianapolis, we're now fully home in Columbus, and we couldn't be happier. We've made our home downtown, and we're deeply committed to the energy and vibrancy of this amazing city.
            </p>

            <p>
              We're also incredibly lucky to be joined in this venture by Josh Rattliff, a certified sommelier and all-around fantastic guy. His passion and knowledge elevate every bottle we serve and every experience we create.
            </p>

            <p>
              So come by. Sip something new. Discover a rare book. Sink into a beautiful chair. Meet a neighbor. Make a friend.
            </p>

            <p className="font-semibold text-st-denis-burgundy">
              We can't wait to welcome you to St. Denis.
            </p>

            <p className="italic text-right font-bold">
              — Bob & Sarah
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light text-st-denis-burgundy text-center mb-12">
            CONTACT US
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div>
              <h3 className="font-sans font-bold text-xl md:text-2xl lg:text-3xl  text-st-denis-burgundy mb-3">
                Address
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-st-denis-burgundy/70">
                426 Washington Street
              </p>
            </div>
            
            <div>
              <h3 className="font-sans font-bold text-xl md:text-2xl lg:text-3xl  text-st-denis-burgundy mb-3">
                Phone Number
              </h3>
              <a 
                href="tel:+18123716114" 
                className="text-sm md:text-base lg:text-lg text-st-denis-burgundy/70 hover:text-st-denis-teal transition-colors"
              >
                (812) 371-6114
              </a>
            </div>
            
            <div>
              <h3 className="font-sans font-bold text-xl md:text-2xl lg:text-3xl  text-st-denis-burgundy mb-3">
                Email
              </h3>
              <a 
                href="mailto:Robert%20Schwartzkopf%20%3Cbaschwartzkopf%40sbcglobal.net%3E"
                className="text-sm md:text-base lg:text-lg text-st-denis-burgundy/70 hover:text-st-denis-teal transition-colors whitespace-nowrap"
              >
                baschwartzkopf@sbcglobal.net
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 md:py-16 px-4 relative"
        style={{
          backgroundImage: 'url(/images/Multicolor_SVG.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="/images/St__Denis_Final_No_Line_08.svg" 
            alt="St. Denis Logo" 
            className="w-64 h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto mb-6 opacity-100"
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
