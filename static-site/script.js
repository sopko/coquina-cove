const photoGroups = [
  { title: "Great Room & Views", photos: [
    { src: "images/balcony-view.jpg", alt: "Beach and Gulf viewed from the balcony", label: "Balcony view" },
    { src: "images/living-area.jpg", alt: "Dining and living area with a broad Gulf view", label: "Living by the water" },
    { src: "images/kitchen-island.jpg", alt: "Open kitchen and dining room with Gulf views", label: "Open-plan great room" },
    { src: "images/kitchen-view.jpg", alt: "Bright fully equipped kitchen", label: "The kitchen" },
    { src: "images/deck-sunset.jpeg", alt: "Sunset over the Gulf from Coquina Cove's covered deck", label: "The sunset deck" },
    { src: "images/beach-view.jpg", alt: "Quiet beach and Gulf view from Coquina Cove", label: "Your backyard" },
    { src: "images/gulf-sunset.jpg", alt: "Pink sunset over the Gulf of Mexico", label: "Gulf sunset" }
  ]},
  { title: "Living Room Furniture", photos: [
    { src: "images/living-room.jpg", alt: "Comfortable living room furniture", label: "Living room seating" }
  ]},
  { title: "Primary Bedroom", photos: [
    { src: "images/master-bedroom-1.jpg", alt: "Primary bedroom with a king bed and private Gulf-view balcony", label: "Gulf-view primary suite" },
    { src: "images/master-bedroom-2.jpg", alt: "Second view of the bright primary bedroom", label: "Primary bedroom" },
    { src: "images/shower.jpg", alt: "Walk-in shower in the primary bathroom", label: "Primary bath shower" }
  ]},
  { title: "Two Guest Bedrooms", photos: [
    { src: "images/guest-room.jpg", alt: "Guest bedroom with a colorful queen bed", label: "Guest bedroom one" },
    { src: "images/guest-room-2.jpg", alt: "Second guest bedroom with a queen bed", label: "Guest bedroom two" }
  ]},
  { title: "Downstairs Seating Area", photos: [
    { src: "images/lower-seating.jpg", alt: "Covered lower-level seating area", label: "Covered lounge" },
    { src: "images/lower-patio.jpg", alt: "Patio seating beneath Coquina Cove", label: "Downstairs patio" }
  ]},
  { title: "View from Downstairs Area", photos: [
    { src: "images/gulf-view.jpeg", alt: "Gulf sunset framed by the downstairs patio", label: "View from downstairs" },
    { src: "images/statue-outside.jpg", alt: "Coquina Cove and its beachside statue on a clear day", label: "Steps from the sand" },
    { src: "images/gulf-photo.jpg", alt: "Sunset waves along the Manasota Key shoreline", label: "Evening shoreline" },
    { src: "images/golden-hour-1.jpg", alt: "Palm silhouettes at golden hour", label: "Golden hour palms" },
    { src: "images/house-front.jpg", alt: "Coquina Cove beachfront home", label: "Coquina Cove" }
  ]}
];

const photos = photoGroups.flatMap(group => group.photos);

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("figure img");
const lightboxLabel = lightbox.querySelector("figcaption span");
const lightboxCount = lightbox.querySelector("figcaption small");
let activePhoto = 0;

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarGrid = document.querySelector(".calendar-grid");
const calendarTitle = document.querySelector(".calendar-title");
const calendarCount = document.querySelector(".calendar-count");
const calendarPrev = document.querySelector(".calendar-prev");
const calendarNext = document.querySelector(".calendar-next");
let calendarMonth = 0;
let bookedDates = new Set();
let calendarStatus = "loading";

function expandBookedDates(bookings) {
  const dates = new Set();
  bookings.forEach(({ start: startValue, endExclusive }) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startValue) || !/^\d{4}-\d{2}-\d{2}$/.test(endExclusive)) return;
    const start = new Date(`${startValue}T00:00:00Z`);
    const end = new Date(`${endExclusive}T00:00:00Z`);
    for (let date = new Date(start); date < end; date.setUTCDate(date.getUTCDate() + 1)) dates.add(date.toISOString().slice(0, 10));
  });
  return dates;
}

function renderCalendar() {
  const today = new Date();
  const month = new Date(today.getFullYear(), today.getMonth() + calendarMonth, 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  calendarTitle.textContent = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  calendarCount.textContent = `Month ${calendarMonth + 1} of 12`;
  calendarPrev.disabled = calendarMonth === 0;
  calendarNext.disabled = calendarMonth === 11;
  calendarGrid.replaceChildren();
  if (month.getFullYear() >= 2027) {
    calendarGrid.className = "calendar-contact";
    calendarGrid.setAttribute("role", "status");
    calendarGrid.setAttribute("aria-label", "Contact Marg for future availability");
    calendarGrid.innerHTML = `<h3>Planning a stay in ${month.getFullYear()}?</h3><p>Please contact our booking agent for availability and help planning your visit.</p><a class="button" href="mailto:marg@sunshinerentals.net?subject=Coquina%20Cove%20future%20availability">Contact Marg <span>↗</span></a>`;
    return;
  }
  calendarGrid.className = "calendar-grid";
  calendarGrid.setAttribute("role", "grid");
  calendarGrid.setAttribute("aria-label", "Property availability");
  weekDays.forEach(day => {
    const heading = document.createElement("div");
    heading.className = "calendar-weekday";
    heading.setAttribute("role", "columnheader");
    heading.textContent = day;
    calendarGrid.append(heading);
  });
  for (let blank = 0; blank < month.getDay(); blank += 1) {
    const empty = document.createElement("div");
    empty.className = "calendar-day is-empty";
    empty.setAttribute("aria-hidden", "true");
    calendarGrid.append(empty);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const booked = bookedDates.has(key);
    const status = calendarStatus === "loading" ? "Checking" : booked ? "Booked" : "Available";
    const cell = document.createElement("div");
    cell.className = `calendar-day ${calendarStatus === "loading" ? "is-loading" : booked ? "is-booked" : "is-available"}`;
    cell.setAttribute("role", "gridcell");
    cell.setAttribute("aria-label", `${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}: ${status}`);
    cell.innerHTML = `<b>${day}</b><span>${status}</span>`;
    calendarGrid.append(cell);
  }
}

calendarPrev.addEventListener("click", () => { calendarMonth = Math.max(0, calendarMonth - 1); renderCalendar(); });
calendarNext.addEventListener("click", () => { calendarMonth = Math.min(11, calendarMonth + 1); renderCalendar(); });
renderCalendar();

async function loadAvailability() {
  const endpoints = ["availability.php", "https://script.google.com/macros/s/AKfycbyov4-OocFuAOux15jQ_4YB4B1GEIRjLLv17b6kj85J3vPBmrCqZ4NGOeksvpLpza7O/exec"];
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
      if (!response.ok) continue;
      const data = await response.json();
      if (!data.ok || !Array.isArray(data.bookings)) continue;
      bookedDates = expandBookedDates(data.bookings);
      calendarStatus = "live";
      const sync = document.querySelector(".calendar-sync");
      sync.hidden = true;
      renderCalendar();
      return;
    } catch {}
  }
  calendarStatus = "error";
  const sync = document.querySelector(".calendar-sync");
  sync.hidden = false;
  sync.className = "calendar-sync error";
  sync.querySelector("span").textContent = "Live calendar is temporarily unavailable. Please contact our booking agent to confirm dates.";
  renderCalendar();
}

loadAvailability();

const roomGallery = document.querySelector(".room-gallery");
photoGroups.forEach((group, groupIndex) => {
  const section = document.createElement("section");
  section.className = "gallery-group";
  const heading = document.createElement("div");
  heading.className = "gallery-group-heading";
  heading.innerHTML = `<span>0${groupIndex + 1}</span><h3>${group.title}</h3>`;
  const grid = document.createElement("div");
  grid.className = "photo-grid";

  group.photos.forEach((photo, photoIndex) => {
    const index = photos.indexOf(photo);
    const button = document.createElement("button");
    button.className = "photo";
    button.type = "button";
    button.dataset.photo = String(index);
    button.setAttribute("aria-label", `View ${photo.label}`);
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = index > 3 ? "lazy" : "eager";
    const caption = document.createElement("span");
    caption.append(document.createTextNode(`${photo.label} `));
    const plus = document.createElement("b");
    plus.textContent = "＋";
    caption.append(plus);
    button.append(image, caption);
    button.addEventListener("click", () => showPhoto(index));
    grid.append(button);

    if (groupIndex === 0 && photoIndex === 0) {
      const quote = document.createElement("blockquote");
      quote.className = "gallery-quote";
      quote.innerHTML = "“We watched dolphins swim, took long walks on the beach every morning, and enjoyed sensational sunsets each evening.”<cite>— The Fabrizio family</cite>";
      grid.append(quote);
    }
  });

  section.append(heading, grid);
  roomGallery.append(section);
});

document.getElementById("year").textContent = new Date().getFullYear();

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

function showPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  const photo = photos[activePhoto];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxLabel.textContent = photo.label;
  lightboxCount.textContent = `${activePhoto + 1} / ${photos.length}`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".text-button[data-photo]").forEach(button => button.addEventListener("click", () => showPhoto(Number(button.dataset.photo))));
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".previous").addEventListener("click", event => { event.stopPropagation(); showPhoto(activePhoto - 1); });
lightbox.querySelector(".next").addEventListener("click", event => { event.stopPropagation(); showPhoto(activePhoto + 1); });
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
lightbox.querySelector("figure").addEventListener("click", event => event.stopPropagation());

document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showPhoto(activePhoto + 1);
  if (event.key === "ArrowLeft") showPhoto(activePhoto - 1);
});
