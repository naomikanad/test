// script.js — simple form handling and events rendering for the homepage

const events = [
  {title: "Campus Photo Walk", date: "2026-10-05", time: "17:30", location: "Old Quad", description: "An easy walk around campus to practice composition and street photography."},
  {title: "Portrait Lighting Workshop", date: "2026-10-12", time: "18:00", location: "Art Building, Room 204", description: "Bring a camera; we'll demo simple one-light and two-light setups."},
  {title: "Darkroom & Film Night", date: "2026-10-20", time: "19:00", location: "Photo Lab", description: "Intro to film developing and printing — limited spots."}
];

function renderEvents() {
  const el = document.getElementById('events-list');
  el.innerHTML = '';
  events.forEach(e => {
    const card = document.createElement('article');
    card.className = 'event-card';
    card.innerHTML = `
      <h4>${e.title}</h4>
      <p><strong>${e.date} · ${e.time}</strong></p>
      <p class="muted">${e.location}</p>
      <p>${e.description}</p>
    `;
    el.appendChild(card);
  });
}

function initSignupForm() {
  const form = document.getElementById('joinForm');
  const success = document.getElementById('join-success');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      year: form.year.value,
      interests: form.interests.value.trim(),
      date: new Date().toISOString()
    };

    if (!data.name || !data.email) {
      alert('Please provide your name and university email.');
      return;
    }

    // Save to localStorage as a simple backend-less sign-up record.
    try {
      const key = 'photoclub_signups';
      const cur = JSON.parse(localStorage.getItem(key) || '[]');
      cur.push(data);
      localStorage.setItem(key, JSON.stringify(cur));
      console.log('Signup saved (local):', data);
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    // Show a success message and reset the form
    success.classList.remove('hidden');
    form.reset();

    // Optionally open the user's mail client with a copy of the signup
    // Uncomment the line below if you'd like to use mailto fallback
    // location.href = `mailto:photoclub@university.edu?subject=Photo Club Signup&body=${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  initSignupForm();
});
