"use client";

import { Fragment, useEffect, useState } from "react";

const photoGroups = [
  {
    title: "Great Room & Views",
    photos: [
      { src: "/images/balcony-view.jpg", alt: "Beach and Gulf viewed from the balcony", label: "Balcony view" },
      { src: "/images/big-window-straightened.jpg", alt: "Straightened arched picture window framing the beach and Gulf", label: "The arched window" },
      { src: "/images/living-area.jpg", alt: "Dining and living area with a broad Gulf view", label: "Living by the water" },
      { src: "/images/kitchen-island.jpg", alt: "Open kitchen and dining room with Gulf views", label: "Open-plan great room" },
      { src: "/images/kitchen-view.jpg", alt: "Bright fully equipped kitchen", label: "The kitchen" },
      { src: "/images/deck-sunset.jpeg", alt: "Sunset over the Gulf from Coquina Cove's covered deck", label: "The sunset deck" },
      { src: "/images/beach-view.jpg", alt: "Quiet beach and Gulf view from Coquina Cove", label: "Your backyard" },
      { src: "/images/gulf-sunset.jpg", alt: "Pink sunset over the Gulf of Mexico", label: "Gulf sunset" },
    ],
  },
  {
    title: "Living Room Furniture",
    photos: [
      { src: "/images/living-room.jpg", alt: "Comfortable living room furniture", label: "Living room seating" },
    ],
  },
  {
    title: "Primary Bedroom",
    photos: [
      { src: "/images/master-bedroom-1.jpg", alt: "Primary bedroom with a king bed and private Gulf-view balcony", label: "Gulf-view primary suite" },
      { src: "/images/master-bedroom-2.jpg", alt: "Second view of the bright primary bedroom", label: "Primary bedroom" },
      { src: "/images/shower.jpg", alt: "Walk-in shower in the primary bathroom", label: "Primary bath shower" },
    ],
  },
  {
    title: "Two Guest Bedrooms",
    photos: [
      { src: "/images/guest-room.jpg", alt: "Guest bedroom with a colorful queen bed", label: "Guest bedroom one" },
      { src: "/images/guest-room-2.jpg", alt: "Second guest bedroom with a queen bed", label: "Guest bedroom two" },
    ],
  },
  {
    title: "Downstairs Seating Area",
    photos: [
      { src: "/images/lower-seating.jpg", alt: "Covered lower-level seating area", label: "Covered lounge" },
      { src: "/images/lower-patio.jpg", alt: "Patio seating beneath Coquina Cove", label: "Downstairs patio" },
    ],
  },
  {
    title: "View from Downstairs Area",
    photos: [
      { src: "/images/gulf-view.jpeg", alt: "Gulf sunset framed by the downstairs patio", label: "View from downstairs" },
      { src: "/images/golden-hour-3.jpg", alt: "Sunset framed by the ground-floor patio", label: "Sunset downstairs" },
      { src: "/images/statue-outside.jpg", alt: "Coquina Cove and its beachside statue on a clear day", label: "Steps from the sand" },
      { src: "/images/gulf-photo.jpg", alt: "Sunset waves along the Manasota Key shoreline", label: "Evening shoreline" },
      { src: "/images/golden-hour-1.jpg", alt: "Palm silhouettes at golden hour", label: "Golden hour palms" },
      { src: "/images/garage.jpg", alt: "Coquina Cove garage and parking area", label: "Garage and parking" },
      { src: "/images/house-front.jpg", alt: "Coquina Cove beachfront home", label: "Coquina Cove" },
    ],
  },
];

const photos = photoGroups.flatMap((group) => group.photos);

const amenities = [
  ["Sleep easy", "1 king · 2 queens · sleeps 6"],
  ["Live outdoors", "Covered Gulf-view deck · grill · outdoor shower"],
  ["Settle in", "Full kitchen · linens · laundry · central A/C"],
  ["Bring the toys", "Oversized two-car garage with boat or camper space"],
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSampleBooked(date: Date, monthOffset: number) {
  const day = date.getDate();
  return (monthOffset % 3 === 0 && day >= 7 && day <= 13) ||
    (monthOffset % 3 === 1 && day >= 18 && day <= 24) ||
    (monthOffset % 3 === 2 && ((day >= 4 && day <= 8) || (day >= 22 && day <= 27)));
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(0);
  const today = new Date();
  const viewMonth = new Date(today.getFullYear(), today.getMonth() + calendarMonth, 1);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from({ length: viewMonth.getDay() + daysInMonth }, (_, index) => index < viewMonth.getDay() ? null : new Date(viewMonth.getFullYear(), viewMonth.getMonth(), index - viewMonth.getDay() + 1));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (activePhoto !== null && event.key === "ArrowRight") setActivePhoto((activePhoto + 1) % photos.length);
      if (activePhoto !== null && event.key === "ArrowLeft") setActivePhoto((activePhoto - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePhoto]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Coquina Cove home" onClick={closeMenu}>
          <span className="brand-mark">CC</span>
          <span><strong>Coquina Cove</strong><small>Manasota Key · Florida</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#stay" onClick={closeMenu}>The stay</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#explore" onClick={closeMenu}>Explore</a>
          <a href="#availability" onClick={closeMenu}>Availability</a>
          <a className="nav-cta" href="#inquire" onClick={closeMenu}>Plan your stay</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <img src="/images/deck-sunset.jpeg" alt="Sun setting over the Gulf from the covered deck" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">A Gulf-front escape on Manasota Key</p>
          <h1>Life looks better<br /><em>from the water’s edge.</em></h1>
          <p className="hero-copy">A light-filled three-bedroom home where quiet beach days flow into front-row sunsets.</p>
          <a className="button button-light" href="#availability">Check availability <span>↗</span></a>
        </div>
        <div className="hero-facts" aria-label="Property highlights">
          <span><b>6</b> guests</span><span><b>3</b> bedrooms</span><span><b>2</b> baths</span><span><b>0</b> steps to the sand</span>
        </div>
        <a className="scroll-cue" href="#stay" aria-label="Scroll to discover"><span>↓</span> Discover</a>
      </section>

      <section className="intro section" id="stay">
        <div className="section-tag"><span>01</span> Your place by the Gulf</div>
        <div className="intro-grid">
          <div className="intro-heading">
            <p className="eyebrow">Easygoing by nature</p>
            <h2>Wake up with the Gulf.<br /><span className="wind-down-line">Wind down with the sun.</span></h2>
          </div>
          <div className="intro-copy">
            <p>At Coquina Cove, the beach isn’t a destination—it’s your backyard. Slide open the doors, follow the path through the sea oats, and you’re there.</p>
            <p>Inside, the bright open living space brings everyone together. Outside, the covered deck is ready for slow breakfasts, dolphin sightings, and the kind of sunsets you’ll talk about long after you leave.</p>
          </div>
        </div>
        <div className="feature-grid feature-quote-grid">
          <figure className="feature-main"><img src="/images/house-front.jpg" alt="Coquina Cove viewed from the beach" /><figcaption>Your Gulf-front home on Manasota Key</figcaption></figure>
          <div className="feature-side">
            <blockquote>“From the moment you walk in the door at Coquina Cove, the view of the ocean and beach will take your breath away.”<cite>— From the guest book</cite></blockquote>
          </div>
        </div>
      </section>

      <section className="details section">
        <div className="details-image"><img src="/images/statue-outside.jpg" alt="Coquina Cove and its beachside statue" /><span className="stamp">Gulf<br />front</span></div>
        <div className="details-content">
          <p className="eyebrow">Everything you need</p>
          <h2>Come as you are.<br />We’ve thought of the rest.</h2>
          <div className="amenity-list">
            {amenities.map(([title, text], index) => <div className="amenity" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
          <p className="fine-print">Plus beach chairs and umbrellas, Wi-Fi, four TVs, books, games, five dining spots, and a fireplace available by request.</p>
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="gallery-heading">
          <div><p className="eyebrow">A closer look</p><h2>Make yourself<br />at home.</h2></div>
          <p>Bright rooms, unfussy comfort, and a little bit of the Gulf in every view.</p>
        </div>
        <div className="room-gallery">
          {photoGroups.map((group, groupIndex) => (
            <section className="gallery-group" key={group.title} aria-labelledby={`gallery-group-${groupIndex}`}>
              <div className="gallery-group-heading"><span>0{groupIndex + 1}</span><h3 id={`gallery-group-${groupIndex}`}>{group.title}</h3></div>
              <div className="photo-grid">
                {group.photos.map((photo, photoIndex) => {
                  const index = photos.indexOf(photo);
                  return (
                    <Fragment key={photo.src}>
                      <button className="photo" onClick={() => setActivePhoto(index)} aria-label={`View ${photo.label}`}>
                        <img src={photo.src} alt={photo.alt} /><span>{photo.label} <b>＋</b></span>
                      </button>
                      {groupIndex === 0 && photoIndex === 0 && (
                        <blockquote className="gallery-quote">“We watched dolphins swim, took long walks on the beach every morning, and enjoyed sensational sunsets each evening.”<cite>— The Fabrizio family</cite></blockquote>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <button className="text-button" onClick={() => setActivePhoto(0)}>View all photos <span>→</span></button>
      </section>

      <section className="explore" id="explore">
        <img src="/images/gulf-surf.jpg" alt="Waves washing onto the beach at Manasota Key" />
        <div className="explore-card">
          <p className="eyebrow light">Beyond the beach</p>
          <h2>Old Florida,<br />at your own pace.</h2>
          <p>Walk to island restaurants and live music, hunt for shark teeth, rent a boat, or wander Stump Pass Beach State Park just half a mile away.</p>
          <ul>
            <li><span>5 min</span> Stump Pass Beach State Park</li>
            <li><span>Walk</span> Dining & live music</li>
            <li><span>45 mi</span> Sarasota–Bradenton Airport</li>
          </ul>
          <a href="https://www.google.com/maps/search/?api=1&query=50+Coquina+Ln+Englewood+FL+34223" target="_blank" rel="noreferrer">Open in Maps ↗</a>
        </div>
      </section>

      <section className="testimonial section">
        <span className="quote-mark">“</span>
        <blockquote>The best part was getting here.<br />The worst was leaving.<br /><em>In between was fantastic.</em></blockquote>
        <p>— Guests from Nova Scotia</p>
      </section>

      <section className="availability section" id="availability">
        <div className="availability-intro">
          <div>
            <p className="eyebrow">Plan your beach week</p>
            <h2>Find your<br />open dates.</h2>
          </div>
          <div className="availability-copy">
            <p>Browse the next twelve months to find an open week. Dates marked booked are unavailable; all other future dates are currently open.</p>
            <div className="calendar-legend"><span><i className="available-dot" />Available</span><span><i className="booked-dot" />Booked</span></div>
            <small className="sample-notice">Sample availability for layout review. Live Google Calendar dates will replace these when connected.</small>
          </div>
        </div>
        <div className="calendar-shell">
          <div className="calendar-toolbar">
            <button type="button" onClick={() => setCalendarMonth(Math.max(0, calendarMonth - 1))} disabled={calendarMonth === 0} aria-label="Previous month">←</button>
            <div><strong>{viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</strong><small>Month {calendarMonth + 1} of 12</small></div>
            <button type="button" onClick={() => setCalendarMonth(Math.min(11, calendarMonth + 1))} disabled={calendarMonth === 11} aria-label="Next month">→</button>
          </div>
          <div className="calendar-grid" role="grid" aria-label={`Availability for ${viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}>
            {weekDays.map((day) => <div className="calendar-weekday" role="columnheader" key={day}>{day}</div>)}
            {calendarDays.map((date, index) => date ? (
              <div className={`calendar-day ${isSampleBooked(date, calendarMonth) ? "is-booked" : "is-available"}`} role="gridcell" aria-label={`${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}: ${isSampleBooked(date, calendarMonth) ? "Booked" : "Available"}`} key={date.toISOString()}>
                <b>{date.getDate()}</b><span>{isSampleBooked(date, calendarMonth) ? "Booked" : "Available"}</span>
              </div>
            ) : <div className="calendar-day is-empty" aria-hidden="true" key={`empty-${index}`} />)}
          </div>
          <div className="calendar-footer"><p>See dates that work?</p><a className="button" href="mailto:Marg@sunshinerentals.net?subject=Coquina%20Cove%20availability%20request">Ask about your stay <span>↗</span></a></div>
        </div>
      </section>

      <section className="inquiry" id="inquire">
        <img src="/images/gulf-sunset.jpg" alt="Pink and gold Gulf sunset" />
        <div className="inquiry-content">
          <p className="eyebrow light">Your beach week awaits</p>
          <h2>Save your seat<br />for sunset.</h2>
          <p>Most stays run Saturday to Saturday. Check-in is at 4 PM and check-out is at 10 AM. Send an inquiry to confirm your dates.</p>
          <a className="button button-light" href="mailto:Marg@sunshinerentals.net?subject=Coquina%20Cove%20availability%20request">Ask about your dates <span>↗</span></a>
          <small>Rental inquiries are handled by Sunshine Rentals.</small>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">CC</span><div><strong>Coquina Cove</strong><small>Manasota Key · Florida</small></div></div>
        <p>A private Gulf-front vacation home<br />in Englewood, Florida.</p>
        <div className="footer-links"><a href="#stay">The stay</a><a href="#gallery">Gallery</a><a href="#explore">Explore</a><a href="#availability">Availability</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Coquina Cove</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {activePhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo gallery" onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close photo gallery">×</button>
          <button className="lightbox-arrow previous" onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto - 1 + photos.length) % photos.length); }} aria-label="Previous photo">←</button>
          <figure onClick={(e) => e.stopPropagation()}><img src={photos[activePhoto].src} alt={photos[activePhoto].alt} /><figcaption><span>{photos[activePhoto].label}</span><small>{activePhoto + 1} / {photos.length}</small></figcaption></figure>
          <button className="lightbox-arrow next" onClick={(e) => { e.stopPropagation(); setActivePhoto((activePhoto + 1) % photos.length); }} aria-label="Next photo">→</button>
        </div>
      )}
    </main>
  );
}
