/* NexArena mobile app: shared data + screen logic. Each block only runs on the screen that has its elements. */

const P = [
    { id: 'ugp', n: 'Ultimate Gamer Pass', p: 1500, t: 'Package', d: 'Unlimited gaming access for a full day.', i: ['PC gaming', 'Console gaming', 'High-speed internet', 'Snack voucher', 'Tournament entry'] },
    { id: 'vip', n: 'VIP Gaming Experience', p: 1500, t: 'Package', d: 'Premium gaming with exclusive facilities.', i: ['Private gaming suite', 'Premium gaming equipment', 'Food and drinks', 'Priority booking', 'Personal gaming assistant'] },
    { id: 'etp', n: 'Esports Training Package', p: 1500, t: 'Package', d: 'Improve your competitive skills with professional coaching.', i: ['Strategy coaching', 'Team communication', 'Match analysis', 'Practice sessions', 'Performance feedback'] },
    { id: 'bpp', n: 'Birthday Party Package', p: 1500, t: 'Package', d: 'Host a gaming-themed birthday celebration.', i: ['Reserved gaming area', 'Multiplayer competitions', 'Party decorations', 'Gaming trophies'] },
    { id: 'vr', n: 'Virtual Reality Experience', p: 750, t: 'Experience', d: 'Immersive VR gameplay with staff assistance.', i: ['VR headset', 'Choice of games', 'Staff assistance'] },
    { id: 'rsc', n: 'Racing Simulator Challenge', p: 750, t: 'Experience', d: 'Race on professional-grade simulators.', i: ['Racing simulator', 'Choice of tracks', 'Leaderboard tracking'] },
    { id: 'erc', n: 'Escape Room Challenge', p: 750, t: 'Experience', d: 'Solve puzzles and escape before time runs out.', i: ['Team challenges', 'Themed escape room', 'Time-trial mode'] }
];

const R = n => 'R' + n.toLocaleString('en-US');
const $ = s => document.querySelector(s);

// ---------- Packages screen ----------
const list = $('#list');
if (list) {
    list.innerHTML = P.map(p => `
        <a class="card row" href="package-details.html?id=${p.id}">
            <div>
                <span class="badge">${p.t}</span>
                <h3>${p.n}</h3>
                <div class="price">${R(p.p)}</div>
            </div>
            <span class="arrow">&rsaquo;</span>
        </a>`).join('');
}

// ---------- Package details page (reads ?id= from the URL) ----------
const detailBody = $('#detailBody');
if (detailBody) {
    const id = new URLSearchParams(location.search).get('id');
    const p = P.find(x => x.id === id) || P[1];
    document.title = p.n + ' | NexArena';
    detailBody.innerHTML = `
        <div class="card">
            <div class="badge">${p.t}</div><h2 class="name">${p.n}</h2>
            <div class="price">${R(p.p)}</div>
            <p class="gap">${p.d}</p>
            <ul class="inc">${p.i.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
        <div class="card">
            <h2>Enquiries and booking</h2>
            <form id="enq">
                <label>Name</label><input required>
                <label>Email</label><input type="email" required>
                <label>Preferred date</label><input type="date" required>
                <button class="btn">Send enquiry</button>
                <div class="msg" id="enqMsg">Thanks! We will confirm your ${p.n} booking shortly.</div>
            </form>
        </div>`;
    $('#enq').addEventListener('submit', e => {
        e.preventDefault();
        $('#enqMsg').style.display = 'block';
    });
}

// ---------- Calculate fees page ----------
const tiles = $('#tiles');
if (tiles) {
    const selected = new Set();

    tiles.innerHTML = P.map(p =>
        `<div class="tile" data-k="${p.id}">${p.n}<small>${R(p.p)}</small></div>`
    ).join('');

    function calculate() {
        const n = selected.size;
        const subtotal = P.filter(p => selected.has(p.id)).reduce((a, p) => a + p.p, 0);
        const rate = n > 3 ? 0.15 : n === 3 ? 0.10 : n === 2 ? 0.05 : 0;
        const off = Math.round(subtotal * rate);
        $('#cnt').textContent = n;
        $('#sub').textContent = R(subtotal);
        $('#disc').textContent = (rate * 100) + '% (-' + R(off) + ')';
        $('#tot').textContent = R(subtotal - off);
    }

    tiles.addEventListener('click', e => {
        const t = e.target.closest('.tile');
        if (!t) return;
        const k = t.dataset.k;
        selected.has(k) ? selected.delete(k) : selected.add(k);
        t.classList.toggle('sel');
        calculate();
    });

    $('#quote').addEventListener('click', () => {
        const m = $('#qMsg');
        m.style.display = 'block';
        m.textContent = selected.size
            ? 'Your quote has been prepared. We will contact you to confirm your booking.'
            : 'Please select at least one package first.';
    });
}
