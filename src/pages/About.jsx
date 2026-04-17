import AnimatedSection from '../components/AnimatedSection';
import './About.css';

const About = () => {
  const curationPillars = [
    { name: 'Global Sourcing',   desc: 'We scout manufacturers across India, Japan, Turkey, and South Korea — selecting only pieces that meet our standards for fabric quality and fit.', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80' },
    { name: 'Trend Accuracy',   desc: 'Our buying team tracks what actually sells in Kerala —oversized shirts, loose trousers, and clean minimal palettes — not what works in Mumbai or Delhi.', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&auto=format&fit=crop&q=80' },
    { name: 'Import Quality',    desc: 'Every imported piece is assessed for fabric weight, stitching, and wash durability before we list it. We carry only what we would wear ourselves.', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&auto=format&fit=crop&q=80' },
  ];

  const milestones = [
    { year: '2014', event: 'YOXI launched in Chelari — originally as a curated menswear boutique in Malappuram, focused on shirts and trousers for young Kerala professionals.' },
    { year: '2018', event: 'Launched online delivery across Kerala and to the Kerala diaspora in the UAE, UK and USA — reaching 10,000 customers in the first year.' },
    { year: '2021', event: 'Introduced the Imported Collection — sourcing directly from Korean, Japanese and Turkish mills to bring international quality to ₹India pricing.' },
    { year: '2024', event: 'Crossed 50,000 orders. Named one of the top 10 emerging menswear brands in South India by GQ India.' },
  ];

  return (
    <div className="about-page">

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&auto=format&fit=crop&q=80" alt="YOXI brand" />
          <div className="about-hero-overlay" />
        </div>
        <div className="container about-hero-content">
          <AnimatedSection animation="fadeUp">
            <p className="about-hero-kicker">Our Story</p>
            <h1 className="about-hero-title">Dressed in<br/><em>Kerala.</em></h1>
            <p className="about-hero-desc">
              YOXI started with a simple belief — Kerala men have great taste and
              deserve great clothes. Not ethnic wear. Not fast fashion. Shirts and pants
              that actually fit the way you want to live.
            </p>
          </AnimatedSection>
        </div>
        <div className="about-hero-scroll-bar" />
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className="about-story section-padding">
        <div className="container">
          <div className="story-grid">
            <AnimatedSection animation="slideInRight" className="story-img-wrap">
              <img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&auto=format&fit=crop&q=80" alt="YOXI style" className="story-img" />
              <div className="story-img-tag">Est. 2014 · Chelari, Malappuram</div>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.2} className="story-text">
              <span className="subtitle">The Founding</span>
              <h2 className="section-title">Built for Kerala Men</h2>
              <p>
                YOXI was founded in Chelari in 2014 with one clear focus — shirts and pants.
                Not ethnic wear, not occasion-based fashion. Just the best everyday shirts and
                trousers a Kerala man can wear to work, to the beach, to a rooftop, or nowhere in particular.
              </p>
              <p>
                We noticed that most Indian menswear brands were designing for Delhi or Mumbai.
                Kerala men dress differently — they're influenced by global trends, they value
                comfort in a tropical climate, and they know good fabric when they feel it.
                YOXI was built to serve exactly that customer.
              </p>
              <div className="story-stats">
                {[['50K+', 'Orders Delivered'], ['500+', 'Active Styles'], ['24hr', 'Dispatch']].map(([n, l]) => (
                  <div key={l} className="story-stat">
                    <span className="story-stat-n">{n}</span>
                    <span className="story-stat-l">{l}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="timeline-section section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp" className="timeline-header">
            <span className="subtitle">Our Journey</span>
            <h2 className="section-title">Milestones</h2>
          </AnimatedSection>
          <div className="timeline">
            {milestones.map((m, i) => (
              <AnimatedSection key={i} animation="fadeUp" delay={i * 0.12} className="timeline-item">
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-event">{m.event}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="weavers-section section-padding">
        <div className="container">
          <AnimatedSection className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">The People</span>
            <h2 className="section-title">Meet the Team</h2>
            <p className="weavers-intro">
              YOXI is run by a small team of fashion obsessives who live in Kerala and
              genuinely care about what men here want to wear.
            </p>
          </AnimatedSection>
          <div className="weavers-grid">
            <AnimatedSection animation="fadeUp" delay={0.1} className="weaver-card">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" alt="Founder" className="weaver-img" />
              <div className="weaver-info">
                <h3>Arjun P.</h3>
                <span className="weaver-role">Founder &amp; Creative Director</span>
                <p className="weaver-bio">Grew up between Chelari and London. Obsessed with the intersection of global fashion and Kerala sensibility. Started YOXI to fill the gap he kept running into.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.25} className="weaver-card">
              <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=600&auto=format&fit=crop&q=80" alt="Head of Buying" className="weaver-img" />
              <div className="weaver-info">
                <h3>Nishad K.</h3>
                <span className="weaver-role">Head of Buying &amp; Imports</span>
                <p className="weaver-bio">10 years in menswear buying across Zara, Mango and boutiques in Seoul. Now runs all of YOXI's sourcing — Indian and international.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CURATION ── */}
      <section className="about-craft section-padding">
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <span className="subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>How We Select</span>
            <h2 className="section-title text-center" style={{ color: '#fff', marginBottom: '3rem' }}>The Curation Standard</h2>
            <div className="craft-grid grid-3">
              {[
                { num: '01', title: 'Feel the Fabric',      desc: "Every piece is assessed for weight, hand-feel, breathability and how it performs in Kerala's humid climate." },
                { num: '02', title: 'Check the Fit',        desc: "If it doesn't drape right — whether that's oversized, loose or tailored — it doesn't make the cut. We try everything on." },
                { num: '03', title: 'Verify the Wash',      desc: "We wash samples repeatedly and check for shrinkage, colour bleed and shape retention before ordering stock." },
              ].map(({ num, title, desc }) => (
                <div className="craft-item" key={num}>
                  <span className="craft-item-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SOURCING ── */}
      <section className="materials-section section-padding">
        <div className="container">
          <AnimatedSection className="text-center" style={{ marginBottom: '4rem' }}>
            <span className="subtitle">Where We Source</span>
            <h2 className="section-title">India &amp; Beyond</h2>
            <p className="materials-subtitle">
              Our collection is a curated mix of Indian-made and internationally sourced shirts and trousers —
              chosen on merit, not origin.
            </p>
          </AnimatedSection>
          <div className="grid-3">
            {curationPillars.map((item, idx) => (
              <AnimatedSection key={idx} animation="fadeUp" delay={idx * 0.15} className="material-card">
                <div className="material-img-wrapper">
                  <img src={item.image} alt={item.name} className="material-img" />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
