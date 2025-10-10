// LocalStorage keys
const STORAGE_KEYS = {
    WALKS: 'walks',
    RECIPES: 'recipes',
    STATS: 'stats'
};

// Initialize data from localStorage or create default
let walks = JSON.parse(localStorage.getItem(STORAGE_KEYS.WALKS)) || [];
let recipes = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECIPES)) || [];

// Sample recipes voor demonstratie
if (recipes.length === 0) {
    recipes = [
        {
            id: Date.now() + 1,
            name: "Groene Smoothie Bowl",
            category: "ontbijt",
            ingredients: [
                "1 bevroren banaan",
                "Handvol spinazie",
                "1 kiwi",
                "250ml amandelmelk",
                "Toppings: granola, bessen, chiazaad"
            ],
            instructions: "Mix de banaan, spinazie, kiwi en amandelmelk in een blender tot een gladde massa. Schenk in een kom en versier met je favoriete toppings. Een voedzame start van je dag!",
            prepTime: 10,
            calories: 320,
            image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400"
        },
        {
            id: Date.now() + 2,
            name: "Quinoa Salade",
            category: "lunch",
            ingredients: [
                "200g quinoa",
                "Cherry tomaten",
                "Komkommer",
                "Feta kaas",
                "Olijfolie",
                "Citroen",
                "Verse munt"
            ],
            instructions: "Kook de quinoa volgens de verpakking. Laat afkoelen. Snijd de groenten in stukjes en meng alles. Maak een dressing van olijfolie en citroensap. Perfecte lunch!",
            prepTime: 20,
            calories: 450,
            image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400"
        },
        {
            id: Date.now() + 3,
            name: "Zoete Aardappel met Kikkererwten",
            category: "diner",
            ingredients: [
                "2 zoete aardappels",
                "1 blik kikkererwten",
                "Paprikapoeder",
                "Komijnpoeder",
                "Yoghurt",
                "Verse peterselie"
            ],
            instructions: "Bak de zoete aardappel 45 min op 200°C. Rooster de kikkererwten met specerijen in de pan. Serveer met yoghurt en peterselie. Heerlijk en voedzaam!",
            prepTime: 50,
            calories: 380,
            image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400"
        }
    ];
    saveRecipes();
}

// ===== WANDEL FUNCTIES =====

function logWalk() {
    const km = parseFloat(document.getElementById('walkKm').value);
    const minutes = parseInt(document.getElementById('walkMinutes').value);

    if (!km || !minutes || km <= 0 || minutes <= 0) {
        alert('Vul alstublieft geldige waarden in voor kilometers en minuten!');
        return;
    }

    const walk = {
        id: Date.now(),
        date: new Date().toISOString(),
        km: km,
        minutes: minutes,
        steps: Math.round(km * 1300) // Ongeveer 1300 stappen per km
    };

    walks.unshift(walk);
    saveWalks();

    // Reset form
    document.getElementById('walkKm').value = '';
    document.getElementById('walkMinutes').value = '';

    // Update UI
    updateWalkStats();
    displayWalkHistory();

    // Success feedback
    showNotification(`Geweldig! Je hebt ${km}km gewandeld in ${minutes} minuten! 🎉`);
}

function saveWalks() {
    localStorage.setItem(STORAGE_KEYS.WALKS, JSON.stringify(walks));
}

function updateWalkStats() {
    const today = new Date().toDateString();
    const todayWalks = walks.filter(w => new Date(w.date).toDateString() === today);
    const todaySteps = todayWalks.reduce((sum, w) => sum + w.steps, 0);

    // Bereken week stats
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekWalks = walks.filter(w => new Date(w.date) >= weekAgo);
    const weekKm = weekWalks.reduce((sum, w) => sum + w.km, 0);

    // Bereken streak
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    while (true) {
        const hasWalk = walks.some(w => {
            const walkDate = new Date(w.date);
            walkDate.setHours(0, 0, 0, 0);
            return walkDate.getTime() === checkDate.getTime();
        });

        if (hasWalk) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    // Update UI met animatie
    animateValue('todaySteps', 0, todaySteps, 1000);
    animateValue('totalKm', 0, weekKm, 1000);
    animateValue('streakDays', 0, streak, 1000);
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current * 10) / 10;
    }, 16);
}

function displayWalkHistory() {
    const walkList = document.getElementById('walkList');

    if (walks.length === 0) {
        walkList.innerHTML = '<p style="color: #666; text-align: center;">Nog geen wandelingen geregistreerd. Begin vandaag!</p>';
        return;
    }

    const recentWalks = walks.slice(0, 10);
    walkList.innerHTML = recentWalks.map(walk => {
        const date = new Date(walk.date);
        const dateStr = date.toLocaleDateString('nl-NL', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
        const timeStr = date.toLocaleTimeString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="walk-entry">
                <div>
                    <div class="walk-entry-date">${dateStr} om ${timeStr}</div>
                    <div class="walk-entry-details">
                        ${walk.km} km • ${walk.minutes} min • ${walk.steps.toLocaleString()} stappen
                    </div>
                </div>
                <button onclick="deleteWalk(${walk.id})" style="background: #ff5252; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
                    Verwijder
                </button>
            </div>
        `;
    }).join('');
}

function deleteWalk(id) {
    if (confirm('Weet je zeker dat je deze wandeling wilt verwijderen?')) {
        walks = walks.filter(w => w.id !== id);
        saveWalks();
        updateWalkStats();
        displayWalkHistory();
        showNotification('Wandeling verwijderd');
    }
}

// ===== RECEPT FUNCTIES =====

function displayRecipes() {
    const grid = document.getElementById('recipeGrid');

    if (recipes.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666;">Nog geen recepten toegevoegd.</p>';
        return;
    }

    grid.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
            <img src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}"
                 alt="${recipe.name}"
                 class="recipe-image"
                 onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.name}</h3>
                <span class="recipe-category">${getCategoryName(recipe.category)}</span>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.prepTime} min</span>
                    ${recipe.calories ? `<span>🔥 ${recipe.calories} kcal</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'ontbijt': 'Ontbijt',
        'lunch': 'Lunch',
        'diner': 'Diner',
        'snack': 'Snack'
    };
    return categories[category] || category;
}

function showRecipeDetails(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    const modal = document.getElementById('recipeModal');
    const details = document.getElementById('recipeDetails');

    const ingredientsList = Array.isArray(recipe.ingredients)
        ? recipe.ingredients
        : recipe.ingredients.split('\n').filter(i => i.trim());

    details.innerHTML = `
        <img src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}"
             alt="${recipe.name}"
             class="recipe-detail-image"
             onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'">
        <h2 class="recipe-detail-title">${recipe.name}</h2>
        <div class="recipe-detail-meta">
            <span>📁 ${getCategoryName(recipe.category)}</span>
            <span>⏱️ ${recipe.prepTime} minuten</span>
            ${recipe.calories ? `<span>🔥 ${recipe.calories} kcal</span>` : ''}
        </div>
        <div class="recipe-detail-section">
            <h3>Ingrediënten</h3>
            <ul>
                ${ingredientsList.map(i => `<li>${i}</li>`).join('')}
            </ul>
        </div>
        <div class="recipe-detail-section">
            <h3>Bereidingswijze</h3>
            <p>${recipe.instructions}</p>
        </div>
        <button onclick="deleteRecipe(${recipe.id})" class="btn" style="background: #ff5252; color: white; margin-top: 1rem;">
            Verwijder Recept
        </button>
    `;

    modal.style.display = 'block';
}

function deleteRecipe(id) {
    if (confirm('Weet je zeker dat je dit recept wilt verwijderen?')) {
        recipes = recipes.filter(r => r.id !== id);
        saveRecipes();
        displayRecipes();
        closeModal();
        showNotification('Recept verwijderd');
    }
}

// Recipe form submit
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipeForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const recipe = {
            id: Date.now(),
            name: document.getElementById('recipeName').value,
            category: document.getElementById('recipeCategory').value,
            ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(i => i.trim()),
            instructions: document.getElementById('recipeInstructions').value,
            image: document.getElementById('recipeImage').value || '',
            prepTime: parseInt(document.getElementById('recipePrepTime').value),
            calories: parseInt(document.getElementById('recipeCalories').value) || null
        };

        recipes.unshift(recipe);
        saveRecipes();
        displayRecipes();

        // Reset form
        form.reset();

        // Scroll to recipes
        document.getElementById('recipeGrid').scrollIntoView({ behavior: 'smooth' });

        showNotification('Recept toegevoegd! 🎉');
    });

    // Initialize displays
    updateWalkStats();
    displayWalkHistory();
    displayRecipes();
});

function saveRecipes() {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
}

// ===== MODAL FUNCTIES =====

function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Close button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
});

// ===== UTILITY FUNCTIES =====

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll voor navigatie
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Extra CSS voor notificaties
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
