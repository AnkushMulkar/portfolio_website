import { useState, useEffect, useRef } from 'react';
import './App.css';

// Custom hook for intersection observer animations
function useIntersectionObserver(options = {}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: observer.unobserve(entry.target) to only animate once
        }
      });
    }, { threshold: 0.1, ...options });

    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, [elements, options]);

  return [setElements];
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi, I'm Ankush. How can I help you today?" }
  ]);

  const [quickQuestions, setQuickQuestions] = useState([
    { id: 1, label: "What is your main expertise?", answer: "I specialize in scaling products for the global market, building robust engineering teams, and integrating Generative AI into production." },
    { id: 2, label: "Are you open to new roles?", answer: "Yes, I am currently open for advisory, consulting, and tech architecture roles." },
    { id: 3, label: "What is your tech architecture?", answer: "I architect scalable systems using React/Next.js for the frontend, and FastAPI/Node.js for backend microservices. I deploy robust multi-agent AI ecosystems via CrewAI and LangChain, bound by strict Dockerization, CI/CD, security protocols, and system monitoring." },
    { id: 4, label: "How do you scale Consumer AI products?", answer: "I build strict engineering teams from scratch, ship foundational MVPs rapidly, and aggressively scale the architecture to handle high-volume global consumer traffic." },
    { id: 5, label: "What is your leadership style?", answer: "I believe in ownership over titles, execution over excuses, and building disciplined engineering systems." },
    { id: 6, label: "How can I contact you?", answer: "You can reach me at ankushmulkar@gmail.com or via LinkedIn." }
  ]);

  const handleQuestionClick = (q) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: q.label },
      { type: 'bot', text: q.answer }
    ]);
    setQuickQuestions(prev => prev.filter(item => item.id !== q.id));
  };

  // For scroll animations
  const sectionRefs = useRef([]);
  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Intersection Observer on the refs
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    sectionRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {/* Top Banner */}
      <div className="top-banner">
        <span><strong>Currently Building:</strong> Scaling a high-growth product for the global market.</span>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo">Ankush Mulkar.</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#execution">Timeline</a></li>
            <li><a href="#stack">Tech Stack</a></li>
            <li><a href="#philosophy">Philosophy</a></li>
            <li><a href="#contact">Work With Me</a></li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero fade-up" ref={addSectionRef}>
          <div className="container">
            <div className="hero-content">
              <h1>Tech Leader Building Scalable Products for the Global Market.</h1>
              <p className="subtitle">
                I lead engineering, product execution, and global market expansion for high-growth startups.
              </p>
              <div className="hero-buttons">
                <a href="#contact" className="btn btn-primary">Work With Me</a>
                <a href="https://www.linkedin.com/in/ankush-mulkar-ab539454/" className="btn btn-outline" target="_blank" rel="noreferrer">Connect on LinkedIn</a>
              </div>
            </div>
          </div>
        </section>

        {/* About / Authority Framing */}
        <section id="about" className="about fade-up" ref={addSectionRef}>
          <div className="container">
            <div className="about-grid">
              <div className="about-intro">
                <h2>I build and scale technology teams that ship real products in competitive markets.</h2>
                <p className="quote">
                  "I operate at the intersection of engineering, execution, and market strategy."
                </p>
              </div>
              <div className="about-details">
                <p><strong>Currently:</strong> Technical Lead</p>
                <p>My focus is on driving business outcomes through robust technical architecture. I do not just write code; I own the product lifecycle from zero to scale.</p>

                <ul className="about-list">
                  <li>Launched & scaled products in the US market</li>
                  <li>Built and optimized engineering teams</li>
                  <li>Lead global engineering operations</li>
                </ul>
              </div>
            </div>

            {/* Metrics */}
            <div className="numbers-grid">
              <div className="number-card">
                <h3>15+</h3>
                <p>Engineers Mentored</p>
              </div>
              <div className="number-card">
                <h3>50+</h3>
                <p>Features Shipped</p>
              </div>
              <div className="number-card">
                <h3>1</h3>
                <p>US Product Launched</p>
              </div>
              <div className="number-card">
                <h3>0 → Scale</h3>
                <p>Product Lifecycle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack / Architecture Commanded */}
        <section id="stack" className="stack fade-up" ref={addSectionRef}>
          <div className="container">
            <h2 className="section-title">The Architecture I Command</h2>
            <div className="stack-grid">
              <div className="stack-item">
                <h3>Frontend Architecture</h3>
                <p className="tech-list">React.js, WebSockets, WebRTC, State Management</p>
                <p>Architecting highly responsive UI systems with strict authentication flows, seamless real-time syncing, real-time voice integration, and robust client-side performance tracking.</p>
              </div>
              <div className="stack-item">
                <h3>Backend & APIs</h3>
                <p className="tech-list">Node.js, FastAPI, Microservices</p>
                <p>Designing highly concurrent, distributed backends enforced by strict API security, rate-limiting, and payload encryption.</p>
              </div>
              <div className="stack-item">
                <h3>AI & Machine Learning</h3>
                <p className="tech-list">Multi-Agent Systems, LLM Integrations, Vector Search</p>
                <p>Deploying scalable Agentic AI ecosystems into production with isolated data handling and optimized inference pipelines.</p>
              </div>
              <div className="stack-item">
                <h3>Infrastructure & Observability</h3>
                <p className="tech-list">AWS, Docker, CI/CD</p>
                <p>Mandating zero-downtime deployments backed by comprehensive monitoring: instance health tracking, centralized logging, real-time error tracing, and usage analytics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section id="execution" className="timeline-section fade-up" ref={addSectionRef}>
          <div className="container">
            <h2 className="section-title">Experience & Execution</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Technical Lead & AI Engineer | AllyNerds</h3>
                  <span className="timeline-date">Scaling Stage</span>
                  <p>Spearheaded the engineering vertical from foundational ML models to full product architecture. Bridged the gap between data science and production, driving product strategy and leading cross-functional teams to deliver scalable, high-impact solutions built for global markets.</p>
                </div>
              </div>
            </div>

            <h2 className="section-title" style={{ marginTop: '4rem' }}>Education & Background</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>MS, Artificial Intelligence & Machine Learning</h3>
                  <p>Liverpool John Moores University</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Executive PGP, AI & Machine Learning</h3>
                  <p>International Institute of Information Technology Bangalore (IIIT-B)</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Bachelor of Engineering</h3>
                  <p>Nagpur University</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials fade-up" ref={addSectionRef}>
          <div className="container">
            <h2 className="section-title">What People Say</h2>
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"Ankush brings an extremely rare blend of deep technical engineering and strategic market clarity. He doesn't just build features; he builds products that actually scale businesses."</p>
                <div className="author">- US Startup Founder</div>
              </div>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"Leading an engineering team across borders requires insane discipline. Ankush provided the structure, speed, and architectural leadership we needed to launch on time."</p>
                <div className="author">- Client / Partner</div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Philosophy */}
        <section id="philosophy" className="philosophy fade-up" ref={addSectionRef}>
          <div className="container">
            <h2 className="section-title">How I Lead</h2>
            <div className="philosophy-grid">
              <div className="philosophy-item glass">
                <h3>Ownership over titles.</h3>
                <p>Leaders take responsibility for outcomes, not just their specific job description.</p>
              </div>
              <div className="philosophy-item glass">
                <h3>Execution over excuses.</h3>
                <p>Ideas are cheap. Shipping real, scalable value to customers is what matters.</p>
              </div>
              <div className="philosophy-item glass">
                <h3>Clarity over noise.</h3>
                <p>Distilling complex technical challenges into actionable, clear strategies.</p>
              </div>
              <div className="philosophy-item glass">
                <h3>Systems over chaos.</h3>
                <p>Building disciplined engineering processes that scale beyond individual heroics.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer / Work With Me */}
      <footer id="contact" className="footer fade-up" ref={addSectionRef}>
        <div className="container">
          <div className="footer-top">
            <h2>Work With Me</h2>
            <p>I work with early-stage founders building for global markets.</p>
            <p className="open-for">
              <strong>Open for:</strong> Advisory | Consulting | Tech Architecture | Mentorship
            </p>
            <a href="mailto:ankushmulkar@gmail.com" className="btn btn-primary">Start a Conversation</a>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ankush Mulkar. Execution Leader & Global Tech Strategist.</p>
            <div className="social-links">
              <a href="https://github.com/AnkushMulkar" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/ankush-mulkar-ab539454/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://ankushmulkar.medium.com/" target="_blank" rel="noreferrer">Medium</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <div className="chatbot-widget">
        <div className={`chatbot-window ${chatbotOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <h4>Ankush</h4>
            <button onClick={() => setChatbotOpen(false)} className="close-btn">&times;</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            {quickQuestions.length > 0 ? (
              <>
                <p className="chat-prompt">Select a question:</p>
                <div className="chat-options">
                  {quickQuestions.map((q) => (
                    <button key={q.id} onClick={() => handleQuestionClick(q)} className="chat-option-btn">
                      {q.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="chat-prompt" style={{ textAlign: "center", fontStyle: "italic", marginBottom: 0 }}>
                Thanks for chatting! Reach out directly for more info.
              </p>
            )}
          </div>
        </div>
        <button
          className="chatbot-btn"
          onClick={() => setChatbotOpen(!chatbotOpen)}
          title="Toggle Assistant"
        >
          <img src="/profile.png" alt="Agent" className="chatbot-icon" />
        </button>
      </div>

    </div>
  );
}

export default App;
