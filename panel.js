document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles Background
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

    // 2. Initialize Line Chart (User Growth)
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const userGrowthChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Active Users',
                data: [45000, 48000, 52000, 61000, 68000, 74000, 79000, 84291],
                borderColor: '#4fa3f7',
                backgroundColor: 'rgba(79, 163, 247, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#1a6ef5',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(5, 22, 46, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#e8f0fe',
                    borderColor: 'rgba(79, 163, 247, 0.3)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
                    ticks: { 
                        color: '#8ba7d4', 
                        font: { size: 10, family: 'DM Sans' },
                        callback: function(value) { return value.toLocaleString(); }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8ba7d4', font: { size: 10, family: 'DM Sans' } }
                }
            }
        }
    });

    // 3. Initialize Pie Chart (Trip Distribution)
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const tripDistChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Adventure', 'Leisure', 'Business', 'Cultural'],
            datasets: [{
                data: [45, 25, 15, 15],
                backgroundColor: [
                    '#1a6ef5', // Adventure
                    '#4fa3f7', // Leisure
                    '#f5c842', // Business
                    '#a78bfa'  // Cultural
                ],
                borderWidth: 0,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#8ba7d4',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        font: { size: 11, family: 'DM Sans' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(5, 22, 46, 0.9)',
                    padding: 12,
                    bodyFont: { size: 13 }
                }
            }
        }
    });
});

// Tab Switching Logic
function switchTab(btn) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
}
