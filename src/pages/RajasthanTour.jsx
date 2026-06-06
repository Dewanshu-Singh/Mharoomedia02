import React, { useRef, useEffect, useState } from 'react';
import './RajasthanTour.css';
import { Mic, MapPin, ChevronLeft, ChevronRight, Landmark, Map, Users, Zap, Flame, Compass, Diamond, Handshake, Newspaper } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/TiltCard';
import MobileVoicesCarousel from '../components/MobileVoicesCarousel';

gsap.registerPlugin(ScrollTrigger);

const RajasthanTour = () => {
  const tourRef = useRef(null);
  const scrollRef = useRef(null);
  const voicesRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    let interval;
    // Auto-scroll for mobile devices
    const startAutoScroll = () => {
      interval = setInterval(() => {
        if (voicesRef.current && window.innerWidth <= 900) {
          const { scrollLeft, scrollWidth, clientWidth } = voicesRef.current;
          // If we reached the end, scroll back to start
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            voicesRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll right by roughly one card width
            voicesRef.current.scrollBy({ left: 250, behavior: 'smooth' });
          }
        }
      }, 3000); // Swipe every 3 seconds
    };

    startAutoScroll();
    return () => clearInterval(interval);
  }, []);

  const scrollVoicesLeft = () => {
    if (voicesRef.current) {
      voicesRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollVoicesRight = () => {
    if (voicesRef.current) {
      voicesRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        setIsAtEnd(true);
      } else {
        setIsAtEnd(false);
      }
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Entrance animations
    tl.fromTo('.rj-subtitle', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.rj-title', 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
      "-=0.5"
    )
    .fromTo('.rj-proposal', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
      "-=0.6"
    )
    .fromTo('.rj-hero-image img', 
      { x: 100, opacity: 0, scale: 0.9 }, 
      { x: 0, opacity: 1, scale: 1.1, duration: 1.2, ease: 'power3.out' }, 
      "-=0.8"
    );

    // Continuous floating animation for the hero car
    gsap.to('.rj-hero-image img', {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Parallax effect on hero scroll
    gsap.to('.rj-hero-image', {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.rj-hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.rj-title', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.rj-hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Universal Section Title Reveal Animation
    const titles = gsap.utils.toArray('.rj-about-title, .rj-tour-title, .rj-voices-title, .rj-why-title, .rj-stories-title, .rj-process-title, .rj-platforms-title');
    titles.forEach(title => {
      gsap.fromTo(title, 
        { y: 50, opacity: 0, scale: 0.9 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // About Section Details Animation
    gsap.fromTo('.rj-about-text p', 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.rj-about-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.rj-about-image', 
      { x: 50, opacity: 0, scale: 0.9, rotation: 2 },
      { 
        x: 0, 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        duration: 1.2, 
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.rj-about-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Tour Section Cards
    gsap.fromTo('.rj-tour-card',
      { y: 60, opacity: 0, rotationY: 15 },
      {
        y: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.rj-tour-cards-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.rj-tour-footer',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: {
          trigger: '.rj-tour-footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Voices Section Cards
    gsap.fromTo('.rj-voice-card',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.rj-voices-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Why Mharoo Cast Animation
    gsap.fromTo('.rj-why-card',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.rj-why-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Stories Section Animation
    gsap.fromTo('.rj-story-card',
      { scale: 0.5, opacity: 0, y: 50, rotationX: 15 },
      {
        scale: 1, opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.15, ease: 'elastic.out(1, 0.7)',
        scrollTrigger: {
          trigger: '.rj-stories-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Process Section Animation
    gsap.fromTo('.rj-process-step',
      { x: -50, opacity: 0, scale: 0.9 },
      {
        x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.rj-process-flow',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Platforms Section Animation
    gsap.fromTo('.rj-platform-card',
      { y: 50, opacity: 0, rotationX: -30 },
      {
        y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.rj-platforms-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // CTA Section Animation
    gsap.fromTo('.rj-cta-large',
      { scale: 0.3, opacity: 0, y: 50 },
      {
        scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: '.rj-cta-section',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Pulsing/Expanding circles for CTA
    gsap.fromTo('.rj-circle-1', { scale: 0, opacity: 0 }, { scale: 1.2, opacity: 0.5, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: '.rj-cta-section', start: 'top 70%' } });
    gsap.fromTo('.rj-circle-2', { scale: 0, opacity: 0 }, { scale: 1.2, opacity: 0.3, duration: 2.5, ease: 'power3.out', scrollTrigger: { trigger: '.rj-cta-section', start: 'top 70%' } });
    gsap.fromTo('.rj-circle-3', { scale: 0, opacity: 0 }, { scale: 1.2, opacity: 0.1, duration: 3, ease: 'power3.out', scrollTrigger: { trigger: '.rj-cta-section', start: 'top 70%' } });

  }, { scope: tourRef });

  const tourData = [
    { name: 'BARMER', status: 'Live Now', image: '/barmer.webp' },
    { name: 'JAISALMER', status: 'Coming Next', image: '/jaisalmer.webp' },
    { name: 'JODHPUR', status: 'Season 3', image: '/jodhpur.webp' },
    { name: 'UDAIPUR', status: 'Season 4', image: '/udhaipur.webp' },
    { name: 'JAIPUR', status: 'Finale', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop' },
  ];

  const voicesData = [
    {
      name: "NIRMAL GEHLOT",
      handle: "nirmalgehlotutkarsh",
      role: "Community Leader",
      image: "/01.png",
      description: "Founder Utkarsh Classes | An Educationist working for betterment of the lives of public at large"
    },
    {
      name: "GANPAT SINGH RAJPUROHIT",
      handle: "ganpat_singh_fogera",
      role: "Community Leader",
      image: "/02.png",
      description: "He is Founder of History Point and an Impactful Motivational Speaker , from Fogera (Barmer)"
    },
    {
      name: "SWAROOP SINGH RATHORE",
      handle: "sskharabjp",
      role: "Community Leader",
      image: "/03.png",
      description: "Former District BJP President, Barmer | BJP Candidate 2023, Sheo Assembly Constituency (Barmer)"
    },
    {
      name: "RAVINDRA SINGH BHATI",
      handle: "@ravindrabhati_9",
      role: "Community Leaders",
      image: "/04.png",
      title: "FROM THE GROUND UP",
      description: "Ravindra's Journey of impact and leadership"
    },
    {
      name: "UMMEDARAM BENIWAL",
      handle: "ummedaram_beniwal",
      role: "Community Leader",
      image: "/05.png",
      description: "Member of Parliament (Lok Sabha) from Barmer-Jaisalmer-Balotra Parliament Constituency"
    },
    {
      name: "ARVIND SINGH BHATI",
      handle: "arvindsingh.bhati9",
      role: "Community Leader",
      image: "/06.png",
      description: "President Student Union, Jai Narain Vyas University (JNVU) Jodhpur, State University Convenor (ABVP)"
    },
    {
      name: "AZAD SINGH RATHORE",
      handle: "azadbarmer",
      role: "Community Leader",
      image: "/07.png",
      description: "State Secretary @Inc.Rajasthan | Writer | Author of Two Books"
    },
    {
      name: "RUMA DEVI",
      handle: "@drrumadevi",
      role: "Heritage & Craft",
      image: "/08.png",
      title: "CRAFTED BY HER",
      description: "The story of passion , identity and empowerment"
    },
    {
      name: "HARISH CHAUDHARY",
      handle: "harishchaudharyinc",
      role: "Community Leader",
      image: "/09.png",
      description: "Serving as the Member of Legislative Assembly from Baytu (Barmer)"
    },
    {
      name: "GOKUL CHOUDHARY",
      handle: "sarpanch_jee",
      role: "Community Leader",
      image: "/10.png",
      description: "Serving as the Member of Legislative Assembly from Baytu (Barmer)"
    },
    {
      name: "ASHOK SHERA",
      handle: "@ashokshera94",
      role: "Storytellers & Voices",
      image: "/11.png",
      title: "FROM NOTES TO NARRATIVES",
      description: "Where local stories become timeless conversations"
    },
    {
      name: "DINESH BOHRA",
      handle: "@dineshbohrabmr",
      role: "Sports & Culture",
      image: "/12.png",
      title: "ON GROUND STORIES",
      description: "Reporting culture / people and journey's beyond the headlines"
    },
    {
      name: "JOGENDRA SINGH CHOUHAN",
      handle: "@jogendrasinghchouhan",
      role: "New-age Entrepreneurs",
      image: "/13.png",
      title: "THE HUSTLE AND THE VISION",
      description: "Inside the mind of a modern entrepreneur"
    },
    {
      name: "CHAITANYA RAJ SINGH",
      handle: "@azadbarmer",
      role: "Folk & Music",
      image: "/14.png",
      title: "ROOTED IN ROYALTY",
      description: "A modern voice preserving timeless traditions"
    }
  ];

  return (
    <div className="rajasthan-tour-page" ref={tourRef}>
      <div className="rj-bg-overlay"></div>
      
      <section className="rj-hero-section">
        <div className="rj-hero-container">
          
          <div className="rj-hero-content">
            <h3 className="rj-subtitle">VOICE OF RAJASTHAN, ONE CITY AT A TIME</h3>
            <h1 className="rj-title">MHAROO <br/><span>CAST</span></h1>
            <h2 className="rj-proposal">GUEST PARTNERSHIP PROPOSAL</h2>
          </div>
          
          <div className="rj-hero-image">
            <img 
              src="/Screenshot_2026-06-04_154913-removebg-preview.png" 
              alt="Mharoo Cast Rajasthan Tour Vehicle" 
            />
          </div>
        </div>
      </section>

      {/* WHAT IS MHAROO CAST SECTION */}
      <section className="rj-about-section">
        <div className="rj-about-container">
          
          <div className="rj-about-content">
            <h1 className="rj-about-title">WHAT IS<br /><span>MHAROO CAST?</span></h1>
            <div className="rj-about-text">
              <p>
                <strong>Mharoo Cast</strong> is a podcast platform dedicated to meaningful conversations, inspiring stories, and valuable insights from entrepreneurs, creators, industry experts, and changemakers.
              </p>
              <p>
                Through engaging discussions and authentic perspectives, Mharoo Cast explores business, creativity, innovation, personal growth, and real-life experiences that inspire audiences to think differently and take action. Each episode is designed to deliver knowledge, motivation, and practical takeaways while building a community of curious minds who believe in learning through conversations and shared experiences.
              </p>
              <p className="rj-about-highlight">
                Whether you're an aspiring entrepreneur, a creative professional, or someone seeking fresh perspectives, Mharoo Cast brings voices and stories that matter directly to you.
              </p>
            </div>
          </div>

          <div className="rj-about-image">
            <img src="/Screenshot_2026-06-04_184509-removebg-preview.png" alt="Mharoo Media Instagram Profile on Phone" />
          </div>

        </div>
      </section>

      {/* ON TOUR ACROSS RAJASTHAN SECTION */}
      <section className="rj-tour-section">
        <div className="rj-tour-container">
          
          <div className="rj-tour-header">
            <h1 className="rj-tour-title">ON TOUR ACROSS <br /><span>RAJASTHAN</span></h1>
            <p className="rj-tour-subtitle">Five seasons. Five cities. One unbroken thread of Rajasthani storytelling.</p>
          </div>

          <div className="rj-tour-cards-container">
            <div className="rj-tour-dashed-line"></div>
            <div className={`rj-tour-swipe-indicator ${isAtEnd ? 'hidden' : ''}`}>Swipe to explore &rarr;</div>
            <div 
              className="rj-tour-cards-flex" 
              ref={scrollRef} 
              onScroll={handleScroll}
            >
              {tourData.map((city, index) => (
                <div className="rj-tour-card" key={index} style={{ perspective: 1000 }}>
                  <TiltCard style={{ width: '100%', height: '100%' }}>
                    <div className="rj-tour-card-image">
                      <img src={city.image} alt={city.name} />
                      <div className="rj-tour-card-overlay"></div>
                    </div>
                    <div className="rj-tour-card-text">
                      <h3>{city.name}</h3>
                      <p>{city.status}</p>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          <div className="rj-tour-footer">
            <p>
              <strong>WHY BARMER FIRST </strong> Border-town soul, Sindhi roots, folk legends, and a generation of young entrepreneurs rebuilding the desert economy. The richest, least-told story in the state and the right place to plant our flag.
            </p>
          </div>

        </div>
      </section>

      {/* VOICES OF CHANGE SECTION */}
      <section className="rj-voices-section">
        <div className="rj-voices-container">
          <div className="rj-voices-header">
            <h1 className="rj-voices-title">VOICES OF <span>CHANGE</span></h1>
          </div>
          
          <div className="rj-voices-carousel-wrapper">
            <button className="rj-voices-scroll-btn left desktop-only" onClick={scrollVoicesLeft} aria-label="Scroll Left">
              <ChevronLeft size={24} />
            </button>
            <button className="rj-voices-scroll-btn right desktop-only" onClick={scrollVoicesRight} aria-label="Scroll Right">
              <ChevronRight size={24} />
            </button>

            <div className="rj-voices-grid desktop-only" ref={voicesRef}>
              {voicesData.map((voice, index) => (
                <div className="rj-voice-card-wrapper" key={index} style={{ perspective: 1000 }}>
                  <TiltCard style={{ height: '100%' }}>
                    <div className="rj-voice-card">
                      <div className="rj-voice-image-wrapper">
                        <img src={voice.image} alt={voice.name} />
                        <div className="rj-voice-overlay"></div>
                        <div className="rj-voice-info">
                          <h3>{voice.name}</h3>
                          <p><em>{voice.handle}</em> &bull; {voice.role}</p>
                        </div>
                      </div>
                      <div className="rj-voice-details">
                        <h4>{voice.title || "LEADERSHIP AND VISION"}</h4>
                        <p>{voice.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
            
            {/* Mobile Swipeable Carousel */}
            <MobileVoicesCarousel voicesData={voicesData} />
          </div>
        </div>
      </section>

      {/* WHY MHAROO CAST SECTION */}
      <section className="rj-why-section">
        <div className="rj-why-container">
          <h1 className="rj-why-title">WHY <span>MHAROO CAST?</span></h1>
          <p className="rj-why-subtitle">Reels capture moments. A podcast captures people. <strong>Mharoo Cast</strong> goes deeper, long-form and rooted in place.</p>
          
          <div className="rj-why-grid">
            <TiltCard>
              <div className="rj-why-card">
                <Mic size={40} className="rj-why-icon" />
                <h3>LONG-FORM CONVERSATIONS</h3>
                <p>30 - 60 minute episodes that let stories breathe.</p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="rj-why-card">
                <Landmark size={40} className="rj-why-icon" />
                <h3>CITY BY CITY TOUR</h3>
                <p>Each season anchored to one Rajasthani city.</p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="rj-why-card">
                <Map size={40} className="rj-why-icon" />
                <h3>HYPER LOCAL LENS</h3>
                <p>Guests, language, and context drawn from the region.</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* THE STORIES SECTION */}
      <section className="rj-stories-section">
        <div className="rj-stories-container">
          <h1 className="rj-stories-title">THE STORIES WE'RE TELLING IN <span>BARMER</span></h1>
          
          <div className="rj-stories-grid">
            <div className="rj-story-card">
              <div className="rj-story-icon"><Users size={32} /></div>
              <div className="rj-story-text">
                <h3>COMMUNITY LEADERS</h3>
                <p>Educators, NGOs, panchayat changemakers and youth icons</p>
              </div>
            </div>
            <div className="rj-story-card">
              <div className="rj-story-icon"><Zap size={32} /></div>
              <div className="rj-story-text">
                <h3>NEW-AGE ENTREPRENEURS</h3>
                <p>Founders building startups, D2C labels, and creator brands from Barmer.</p>
              </div>
            </div>
            <div className="rj-story-card">
              <div className="rj-story-icon"><Flame size={32} /></div>
              <div className="rj-story-text">
                <h3>FOLK & MUSIC</h3>
                <p>Manganiyars, Langas, and the voices keeping desert sound alive.</p>
              </div>
            </div>
            <div className="rj-story-card">
              <div className="rj-story-icon"><Compass size={32} /></div>
              <div className="rj-story-text">
                <h3>TRAVEL & HOSPITALITY</h3>
                <p>Homestay owners, dune-camp operators, and offbeat guides.</p>
              </div>
            </div>
            <div className="rj-story-card">
              <div className="rj-story-icon"><Diamond size={32} /></div>
              <div className="rj-story-text">
                <h3>HERITAGE & CRAFT</h3>
                <p>Block printers, ajrakh artisans, Kashida embroiderers.</p>
              </div>
            </div>
            <div className="rj-story-card">
              <div className="rj-story-icon"><Handshake size={32} /></div>
              <div className="rj-story-text">
                <h3>SPORTS & CULTURE</h3>
                <p>Wrestlers, riders, athletes carrying the Barmer name forward.</p>
              </div>
            </div>
          </div>
          
          <p className="rj-stories-footer">If a story has a Barmer postal code and a pulse, it belongs on Mharoo Cast.</p>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="rj-process-section">
        <div className="rj-process-container">
          <h1 className="rj-process-title">FROM FIRST CALL TO <span>FINAL CUT</span></h1>
          <p className="rj-process-subtitle">A simple, calm process. No pressure, no scripts you don't agree with.</p>
          
          <div className="rj-process-flow">
            <div className="rj-process-step">
              <div className="rj-process-number">01</div>
              <div className="rj-process-card">
                <h3>DISCOVERY CALL</h3>
                <p>We talk for 20 mins, align on themes you actually care about.</p>
              </div>
            </div>
            <div className="rj-process-step">
              <div className="rj-process-number">02</div>
              <div className="rj-process-card">
                <h3>TOPIC OUTLINE</h3>
                <p>We share a question framework , you tweak, approve, or rewrite.</p>
              </div>
            </div>
            <div className="rj-process-step">
              <div className="rj-process-number">03</div>
              <div className="rj-process-card">
                <h3>RECORDING DAY</h3>
                <p>In-studio in Barmer or remote fully produced, your call.</p>
              </div>
            </div>
            <div className="rj-process-step">
              <div className="rj-process-number">04</div>
              <div className="rj-process-card">
                <h3>EDIT & APPROVAL</h3>
                <p>You see the cut before anyone else. Nothing goes live without sign-off.</p>
              </div>
            </div>
            <div className="rj-process-step">
              <div className="rj-process-number">05</div>
              <div className="rj-process-card">
                <h3>LAUNCH & PR PUSH</h3>
                <p>Episode drops, partners amplify, short-form assets land in your DMs.</p>
              </div>
            </div>
          </div>
          
          <p className="rj-process-footer">YOU CAN PULL OUT AT ANY POINT BEFORE LAUNCH NO QUESTIONS, NO HARD FEELINGS.</p>
        </div>
      </section>

      {/* PLATFORMS SECTION */}
      <section className="rj-platforms-section">
        <div className="rj-platforms-container">
          <h1 className="rj-platforms-title">WHERE <span>MHAROO CAST</span> LIVES</h1>
          <p className="rj-platforms-subtitle">Native to Rajasthan, distributed everywhere your audience already is.</p>
          
          <div className="rj-platforms-grid">
            <div className="rj-platform-card">
              <div className="rj-platform-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" alt="Spotify Icon" style={{height: '35px', marginRight: '10px'}} />
                <span style={{fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.5px'}}>Spotify</span>
              </div>
              <div className="rj-platform-divider"></div>
              <p>Full audio episodes, searchable by your name and category.</p>
            </div>
            <div className="rj-platform-card">
              <div className="rj-platform-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube Icon" style={{height: '30px', marginRight: '10px'}} />
                <span style={{fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.6rem', color: '#fff', letterSpacing: '-1px'}}>YouTube</span>
              </div>
              <div className="rj-platform-divider"></div>
              <p>Long-form video episode + chaptered timestamps for shareability.</p>
            </div>
            <div className="rj-platform-card">
              <div className="rj-platform-logo rj-ig-logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram Icon" style={{height: '35px', marginRight: '10px'}} /> 
                <span style={{fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.5px'}}>Instagram</span>
              </div>
              <div className="rj-platform-divider"></div>
              <p>Reels, carousels, quote cards tagged @you on every asset.</p>
              <a 
                href="https://www.instagram.com/mharoocast?igsh=MTJqd2MwZzh1eWh0Yw==" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginTop: '15px', 
                  color: '#e1306c', 
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '0.95rem'
                }}
              >
                View our channel <span style={{marginLeft: '5px'}}>→</span>
              </a>
            </div>
            <div className="rj-platform-card">
              <div className="rj-platform-logo rj-pr-logo">
                <Newspaper size={30} style={{marginRight: '10px'}} color="#fff" /> 
                <span style={{fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: '#fff', letterSpacing: '1px'}}>PR NETWORK</span>
              </div>
              <div className="rj-platform-divider"></div>
              <p>Multi-page coverage features, reposts, write-ups. and</p>
            </div>
          </div>
          
          <div className="rj-platforms-banner">
            <p><strong>Cross-platform launch</strong> within <strong>48 hours</strong> of the episode going live synchronised push, not staggered drips.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="rj-cta-section">
        <div className="rj-cta-bg-circles">
          <div className="rj-circle-1"></div>
          <div className="rj-circle-2"></div>
          <div className="rj-circle-3"></div>
        </div>
        <div className="rj-cta-container">
          <div className="rj-cta-content">
            <h2 className="rj-cta-small">YOUR STORY BELONGS ON</h2>
            <h1 className="rj-cta-large">MHAROO <span>CAST</span></h1>
            <p className="rj-cta-text">
              Block a date, share your handles, and we'll send across a topic outline within 48 hours. 
              The Barmer studio is ready, our calendar is open, and we'd be honoured to have you in season one.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RajasthanTour;


