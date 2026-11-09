/* Lakewood Conference Centre — Part 3 JavaScript
   Interactive gallery, FAQ, event enquiry processing, contact mailto and map. */

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
}

// 24 gallery entries across four categories. Images are loaded from Unsplash URLs.
const galleryItems = [
  {title:'Conference stage and seating',category:'conference',alt:'Conference stage prepared with audience seating',id:'1511578314322-379afb476865'},
  {title:'Business conference audience',category:'conference',alt:'Business conference audience in a modern venue',id:'1540575467063-178a50c2df87'},
  {title:'Meeting room arrangement',category:'conference',alt:'Professional meeting room with tables and chairs',id:'1556761175-b413da4baf72'},
  {title:'Corporate event presentation',category:'conference',alt:'Corporate event presentation space',id:'1505373877841-8d25f7d46678'},
  {title:'Conference networking',category:'conference',alt:'People networking at a professional conference',id:'1517457373958-b7bdd4587205'},
  {title:'Workshop venue',category:'conference',alt:'Workshop and training venue arrangement',id:'1497366754035-f200968a6e72'},
  {title:'Boardroom meeting setup',category:'conference',alt:'Boardroom meeting table and chairs',id:'1497366811353-6870744d04b2'},
  {title:'Modern meeting space',category:'conference',alt:'Bright modern meeting and collaboration space',id:'1497366216548-37526070297c'},
  {title:'Wedding reception tables',category:'wedding',alt:'Wedding reception tables decorated for a celebration',id:'1519167758481-83f550bb49b3'},
  {title:'Wedding reception details',category:'wedding',alt:'Elegant wedding reception decoration details',id:'1464366400600-7168b8af9bc3'},
  {title:'Wedding celebration venue',category:'wedding',alt:'Wedding celebration in a decorated venue',id:'1511795409834-ef04bbd61622'},
  {title:'Wedding table setting',category:'wedding',alt:'Wedding table setting with flowers and place settings',id:'1529636798458-92182e662485'},
  {title:'Wedding ceremony styling',category:'wedding',alt:'Wedding ceremony styling and floral decorations',id:'1465495976277-4387d4b0e4a6'},
  {title:'Elegant event tables',category:'wedding',alt:'Elegant event tables prepared for a wedding reception',id:'1507504031003-b417219a0fde'},
  {title:'Celebration lighting',category:'celebration',alt:'Warm lighting at an evening celebration',id:'1492684223066-81342ee5ff30'},
  {title:'Private celebration event',category:'celebration',alt:'Guests enjoying a private celebration event',id:'1527529482837-4698179dc6ce'},
  {title:'Event decorations',category:'celebration',alt:'Decorative event styling and celebration details',id:'1519671482749-fd09be7ccebf'},
  {title:'Social event venue',category:'celebration',alt:'Social event venue prepared for guests',id:'1505236858219-8359eb29e329'},
  {title:'Celebration dinner',category:'celebration',alt:'Celebration dinner arrangement in an event space',id:'1528605248644-14dd04022da1'},
  {title:'Party and event styling',category:'celebration',alt:'Colourful party styling and event decorations',id:'1530103862676-de8c9debad1d'},
  {title:'Restaurant dining space',category:'dining',alt:'Restaurant dining space with arranged tables',id:'1517248135467-4c7edcad34c4'},
  {title:'Dining table arrangement',category:'dining',alt:'Dining table arrangement for a group meal',id:'1414235077428-338989a2e8c0'},
  {title:'Modern hospitality interior',category:'dining',alt:'Modern hospitality interior with seating',id:'1559339352-11d035aa65de'},
  {title:'Venue lounge area',category:'dining',alt:'Comfortable lounge area in a hospitality venue',id:'1600210492486-724fe5c67fb0'}
];
const imageUrl = (id, width=900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=78`;
const galleryGrid = document.getElementById('galleryGrid');
const gallerySearch = document.getElementById('gallerySearch');
const galleryCount = document.getElementById('galleryResultCount');
const galleryEmpty = document.getElementById('galleryEmpty');
let activeFilter = 'all';
let visibleGalleryItems = [];
let lightboxIndex = 0;

function renderGallery() {
  if (!galleryGrid) return;
  const query = (gallerySearch?.value || '').trim().toLowerCase();
  visibleGalleryItems = galleryItems.filter((item) => {
    const categoryMatch = activeFilter === 'all' || item.category === activeFilter;
    const searchMatch = `${item.title} ${item.alt} ${item.category}`.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
  galleryGrid.innerHTML = '';
  visibleGalleryItems.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-card';
    button.setAttribute('aria-label', `Open image: ${item.title}`);
    const image = document.createElement('img');
    image.src = imageUrl(item.id, 760);
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    const caption = document.createElement('span');
    caption.textContent = item.title;
    button.append(image, caption);
    button.addEventListener('click', () => openLightbox(index));
    galleryGrid.append(button);
  });
  if (galleryCount) galleryCount.textContent = `${visibleGalleryItems.length} of ${galleryItems.length} images shown`;
  if (galleryEmpty) galleryEmpty.hidden = visibleGalleryItems.length !== 0;
}

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderGallery();
  });
});
gallerySearch?.addEventListener('input', renderGallery);
renderGallery();

// Accessible custom lightbox with previous/next controls and keyboard support.
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.id = 'galleryLightbox';
lightbox.hidden = true;
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Gallery image viewer');
lightbox.innerHTML = `<div class="lightbox-content"><button class="lightbox-close" type="button" aria-label="Close image viewer">×</button><button class="lightbox-prev" type="button" aria-label="Previous image">‹</button><img class="lightbox-image" alt=""><p class="lightbox-caption"></p><button class="lightbox-next" type="button" aria-label="Next image">›</button></div>`;
document.body.append(lightbox);
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
function showLightboxImage() {
  const item = visibleGalleryItems[lightboxIndex];
  if (!item) return;
  lightboxImage.src = imageUrl(item.id, 1600);
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = `${item.title} (${lightboxIndex + 1} of ${visibleGalleryItems.length})`;
}
function openLightbox(index) {
  if (!visibleGalleryItems.length) return;
  lightboxIndex = index;
  showLightboxImage();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
function moveLightbox(direction) {
  if (!visibleGalleryItems.length) return;
  lightboxIndex = (lightboxIndex + direction + visibleGalleryItems.length) % visibleGalleryItems.length;
  showLightboxImage();
}
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => moveLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});

// FAQ behaves as a single-open accordion for a tidy reading experience.
document.querySelectorAll('.faq-item').forEach((item) => item.addEventListener('toggle', () => {
  if (!item.open) return;
  document.querySelectorAll('.faq-item').forEach((other) => { if (other !== item) other.open = false; });
}));

// Enquiry workflow: collect -> validate -> process -> display a reviewable summary.
const enquiryForm = document.getElementById('enquiryForm');
const enquiryError = document.getElementById('enquiryError');
const enquirySummary = document.getElementById('enquirySummary');
const summaryDetails = document.getElementById('summaryDetails');
const eventDate = document.getElementById('eventDate');
if (eventDate) eventDate.min = new Date().toISOString().slice(0, 10);
function showError(element, message) { element.textContent = message; element.hidden = false; }
function addSummaryRow(label, value) {
  const term = document.createElement('dt'); term.textContent = label;
  const description = document.createElement('dd'); description.textContent = value || 'Not provided';
  summaryDetails.append(term, description);
}
enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  enquiryError.hidden = true;
  if (!enquiryForm.reportValidity()) return;
  const data = new FormData(enquiryForm);
  const phone = String(data.get('phone') || '').trim();
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) { showError(enquiryError, 'Please enter a valid contact number with 7 to 15 digits.'); return; }
  const guests = Number(data.get('guests'));
  if (!Number.isInteger(guests) || guests < 1 || guests > 5000) { showError(enquiryError, 'Guest count must be a whole number between 1 and 5,000.'); return; }
  const chosenDate = new Date(`${data.get('eventDate')}T00:00:00`);
  const today = new Date(); today.setHours(0,0,0,0);
  if (chosenDate < today) { showError(enquiryError, 'Please choose today or a future date.'); return; }
  const values = [
    ['Full name', data.get('name')], ['Contact number', phone], ['Email address', data.get('email')],
    ['Event type', data.get('eventType')], ['Preferred date', data.get('eventDate')],
    ['Estimated guests', String(guests)], ['Setup preference', data.get('setup')], ['Requirements', data.get('message')]
  ];
  summaryDetails.innerHTML = '';
  values.forEach(([label, value]) => addSummaryRow(label, String(value || '').trim()));
  enquirySummary.hidden = false;
  enquirySummary.scrollIntoView({behavior:'smooth', block:'nearest'});
});
document.getElementById('printSummary')?.addEventListener('click', () => window.print());
document.getElementById('editEnquiry')?.addEventListener('click', () => {
  enquirySummary.hidden = true;
  enquiryForm.querySelector('input[name="name"]').focus();
});

// Contact form is intentionally separate from event enquiries. It prepares a mailto draft.
// Replace this blank recipient with Lakewood's verified public email before production use.
const CONTACT_EMAIL = 'info@thelakewood.co.za';
const contactForm = document.getElementById('contactForm');
const contactError = document.getElementById('contactError');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  contactError.hidden = true;
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const body = `Name: ${data.get('contactName')}\nEmail: ${data.get('contactEmail')}\n\n${data.get('contactMessage')}`;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(String(data.get('subject')))}&body=${encodeURIComponent(body)}`;
  document.getElementById('contactSuccess').hidden = false;
  document.getElementById('contactSuccess').textContent = 'Your email draft is being opened in your default email application. Please review and send it there.';
  window.location.href = mailto;
});

// Interactive OpenStreetMap using Leaflet. Pin is deliberately regional until the exact venue address is verified.
function initialiseMap() {
  const mapElement = document.getElementById('lakewoodMap');
  if (!mapElement) return;
  if (typeof L === 'undefined') {
    const fallback = document.getElementById('mapFallback');
    if (fallback) fallback.hidden = false;
    return;
  }
  const map = L.map(mapElement).setView([-26.243208, 27.995896], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.marker([-26.243208, 27.995896]).addTo(map)
    .bindPopup('<strong>Lakewood Conference Centre</strong><br>2 Vinton Road, Ormonde, Johannesburg South 2091. Confirm the entrance with the venue if needed.')
    .openPopup();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseMap);
else initialiseMap();
