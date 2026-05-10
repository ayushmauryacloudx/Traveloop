document.addEventListener('DOMContentLoaded', () => {
    // 1. Particles Background Effect
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = Math.random() * 100 + 'vh';
            p.style.animationDuration = Math.random() * 3 + 2 + 's';
            p.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(p);
        }
    }

    // 2. Initialize App
    renderNotes();
    updateCharCount();
});

// Local Storage DB Connection
const DB_KEY = 'traveloop_notes_db';

// Initialize from LocalStorage or default
let notes = JSON.parse(localStorage.getItem(DB_KEY)) || [
    { _id: 1, type: 'trip', content: 'Met an amazing local guide in Tokyo today. He showed us the best hidden ramen shop in Shinjuku! Definitely need to come back.', date: '2026-05-10', time: '14:20', mood: '🤩', trip: 'tokyo', pinned: true, favorite: false },
    { _id: 2, type: 'reminder', content: 'Buy Eiffel Tower tickets for next Tuesday. Remember to bring a light jacket as it might get chilly in the evening.', date: '2026-05-11', time: '09:00', mood: '😊', trip: 'paris', pinned: false, favorite: true },
    { _id: 3, type: 'trip', content: 'The sunset at Bali beach was breathtaking. We stayed until the stars came out. Pure peace.', date: '2026-04-22', time: '18:45', mood: '😌', trip: 'bali', pinned: false, favorite: false }
];

// Helper to save to DB
function saveToDB() {
    localStorage.setItem(DB_KEY, JSON.stringify(notes));
}

let useApi = true;
const getToken = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return user ? user.token : 'mock_token';
};

let selectedMood = '😊';
let isPinned = false;
let currentFilter = 'all';

// Mood Selection Logic
window.selectMood = function(btn, emoji) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = emoji;
};

// Toggle Pin Status
window.togglePin = function() {
    isPinned = !isPinned;
    const pinBtn = document.getElementById('pinToggle');
    if (isPinned) {
        pinBtn.classList.add('pinned');
        pinBtn.innerHTML = '📌 Pinned';
    } else {
        pinBtn.classList.remove('pinned');
        pinBtn.innerHTML = '📌 Pin to Top';
    }
};

// Real-time Textarea Logic
window.onType = function() {
    updateCharCount();
    showAutoSave();
};

function updateCharCount() {
    const textInput = document.getElementById('noteTextarea');
    const countDisplay = document.getElementById('charCount');
    if (textInput && countDisplay) {
        countDisplay.innerText = `${textInput.value.length} / 2000`;
    }
}

function showAutoSave() {
    const as = document.getElementById('autosave');
    if (as) {
        as.classList.add('show');
        setTimeout(() => as.classList.remove('show'), 2000);
    }
}

// Save Note Logic
window.saveNote = async function() {
    const text = document.getElementById('noteTextarea').value;
    const trip = document.getElementById('tripSelect').value;
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;

    if (!text.trim()) {
        showToast('Please enter some text for your note!', '#f87171');
        return;
    }

    const newNote = {
        type: 'trip',
        content: text,
        date: date || new Date().toISOString().split('T')[0],
        time: time || '12:00',
        mood: selectedMood,
        trip: trip || 'General',
        pinned: isPinned,
        favorite: false
    };

    if (useApi) {
        try {
            const res = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
                body: JSON.stringify(newNote)
            });
            if (!res.ok) throw new Error('API failed');
        } catch (e) {
            useApi = false;
            newNote._id = Date.now();
            notes.unshift(newNote);
            saveToDB();
        }
    } else {
        newNote._id = Date.now();
        notes.unshift(newNote);
        saveToDB();
    }

    renderNotes();
    clearEditor();
    showToast('Note saved successfully! ✍️', '#4ade80');
};

// Add Reminder Mock
window.addReminder = function() {
    const text = document.getElementById('noteTextarea').value;
    if (!text.trim()) {
        showToast('Please enter a reminder!', '#f87171');
        return;
    }
    showToast('Reminder added! 🔔', '#f5c842');
};

// Render Notes to Timeline
async function renderNotes() {
    const list = document.getElementById('notesList');
    if (!list) return;

    list.innerHTML = '';

    let fetchedNotes = notes;
    if (useApi) {
        try {
            const res = await fetch('http://localhost:5000/api/notes', {
                headers: { 'Authorization': 'Bearer ' + getToken() }
            });
            if (res.ok) {
                fetchedNotes = await res.json();
                notes = fetchedNotes;
            } else {
                useApi = false;
            }
        } catch (e) {
            useApi = false;
        }
    }

    let filtered = fetchedNotes;
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchVal) {
        filtered = filtered.filter(n => n.content.toLowerCase().includes(searchVal) || n.trip.toLowerCase().includes(searchVal));
    }

    if (currentFilter === 'fav') {
        filtered = filtered.filter(n => n.favorite);
    } else if (currentFilter !== 'all') {
        filtered = filtered.filter(n => n.type === currentFilter || n.trip === currentFilter);
    }

    // Sort: Pinned first
    filtered.sort((a, b) => b.pinned - a.pinned);

    filtered.forEach(note => {
        const card = document.createElement('div');
        card.className = `note-card ${note.pinned ? 'pinned' : ''}`;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <div style="display:flex; gap:8px; align-items:center;">
                    <span style="font-size:1.2rem">${note.mood}</span>
                    <span style="font-size:0.7rem; color:var(--slate); text-transform:uppercase; letter-spacing:1px;">${note.trip}</span>
                </div>
                <div style="font-size:0.75rem; color:var(--slate);">${note.date} ${note.time}</div>
            </div>
            <p style="font-size:0.9rem; line-height:1.6; color:var(--mist);">${note.content}</p>
            <div style="display:flex; gap:10px; margin-top:12px;">
                <button onclick="toggleFav('${note._id}')" style="background:none; border:none; cursor:pointer; color:${note.favorite ? 'var(--journey-gold)' : 'var(--slate)'}; font-size: 1rem;">
                    ${note.favorite ? '⭐' : '☆'}
                </button>
                <button onclick="deleteNote('${note._id}')" style="background:none; border:none; cursor:pointer; color:var(--slate); opacity:0.6; font-size:0.8rem;">🗑️ Delete</button>
            </div>
        `;
        list.appendChild(card);
    });

    const countLabel = document.getElementById('noteCount');
    if (countLabel) countLabel.innerText = `${filtered.length} notes`;
}

// Global UI Handlers
window.setFilter = function(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderNotes();
};

window.filterNotes = function() {
    renderNotes();
};

window.toggleFav = async function(id) {
    const note = notes.find(n => n._id == id);
    if (note) {
        note.favorite = !note.favorite;
        saveToDB(); // Save state persistently
        if (useApi) {
            try {
                await fetch('http://localhost:5000/api/notes/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
                    body: JSON.stringify({ favorite: note.favorite })
                });
            } catch(e) {}
        }
    }
    renderNotes();
};

window.deleteNote = async function(id) {
    if (useApi) {
        try {
            await fetch('http://localhost:5000/api/notes/' + id, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + getToken() }
            });
        } catch(e) {}
    }
    notes = notes.filter(n => n._id != id);
    saveToDB(); // Save state persistently
    renderNotes();
    showToast('Note deleted', '#f87171');
};

window.showToast = function(msg, color) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = msg;
        toast.style.background = color || 'var(--azure)';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

window.focusEditor = function() {
    const editor = document.getElementById('editorCard');
    if (editor) {
        editor.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('noteTextarea').focus();
    }
};

function clearEditor() {
    document.getElementById('noteTextarea').value = '';
    document.getElementById('tripSelect').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('timeInput').value = '';
    isPinned = false;
    const pinBtn = document.getElementById('pinToggle');
    if (pinBtn) {
        pinBtn.classList.remove('pinned');
        pinBtn.innerHTML = '📌 Pin to Top';
    }
    updateCharCount();
}
