// LocalStorage keys
const STORAGE_KEYS = {
    RECIPES: 'recipes',
    BODYFAT: 'bodyfat',
    VO2MAX: 'vo2max'
};

// Initialize data from localStorage or create default
let recipes = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECIPES)) || [];
let bodyfatData = JSON.parse(localStorage.getItem(STORAGE_KEYS.BODYFAT)) || {};
let vo2Data = JSON.parse(localStorage.getItem(STORAGE_KEYS.VO2MAX)) || {};

// Realistische recepten op basis van wat de gebruiker eet
if (recipes.length === 0) {
    recipes = [
        {
            id: Date.now() + 1,
            name: "Power Ontbijt met Eieren en Avocado",
            category: "ontbijt",
            ingredients: [
                "3 eieren",
                "½ avocado",
                "Handvol doperwtjes (vers of bevroren)",
                "1 tomaat in blokjes",
                "Goede olijfolie (extra vergine)",
                "Zout en peper naar smaak"
            ],
            instructions: "Bak de eieren zoals je ze lekker vindt (roerei, spiegelei of pocheer ze). Verwarm de doperwtjes kort. Snijd de avocado en tomaat. Arrangeer alles op een bord en besprenkel met goede olijfolie. Perfect high-protein ontbijt!",
            prepTime: 10,
            macros: {
                protein: 25,
                carbs: 12,
                fat: 28
            },
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400"
        },
        {
            id: Date.now() + 2,
            name: "Hele Zeebaars met Citroen",
            category: "lunch",
            ingredients: [
                "1 hele zeebaars (schoongemaakt)",
                "1 citroen (in plakjes)",
                "Verse tijm of peterselie",
                "Olijfolie",
                "Knoflook (2 tenen)",
                "Zout en peper"
            ],
            instructions: "Verwarm de oven voor op 180°C. Vul de buikholte van de zeebaars met citroenplakjes en kruiden. Bestrijk de vis met olijfolie en kruid met zout en peper. Bak 25-30 minuten in de oven tot de vis gaar is. Heerlijk licht en vol eiwitten!",
            prepTime: 35,
            macros: {
                protein: 42,
                carbs: 3,
                fat: 18
            },
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400"
        },
        {
            id: Date.now() + 3,
            name: "Kipfilet met Paddenstoelen en Broccoli",
            category: "diner",
            ingredients: [
                "200g kipfilet",
                "200g gemengde paddenstoelen",
                "1 kop broccoli roosjes",
                "75g zilvervliesrijst (ongekookt)",
                "100ml room (of kokosroom)",
                "Knoflook, tijm",
                "Olijfolie, zout, peper"
            ],
            instructions: "Kook de zilvervliesrijst volgens de verpakking. Bak de kipfilet in olijfolie tot goudbruin en gaar. Voeg paddenstoelen en knoflook toe, bak 5 min. Voeg room toe en laat inkoken. Stoom ondertussen de broccoli. Serveer alles samen voor een complete, voedzame maaltijd!",
            prepTime: 30,
            macros: {
                protein: 38,
                carbs: 52,
                fat: 22
            },
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"
        }
    ];
    saveRecipes();
}

// ===== METRICS FUNCTIES =====

// Body Fat Percentage
function saveBodyfat() {
    const current = parseFloat(document.getElementById('currentBodyfat').value);
    const goal = parseFloat(document.getElementById('goalBodyfat').value);

    if (!current || !goal) {
        alert('Vul beide waarden in!');
        return;
    }

    bodyfatData = {
        current: current,
        goal: goal,
        lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.BODYFAT, JSON.stringify(bodyfatData));
    updateBodyfatDisplay();
    showNotification('Lichaamsvetpercentage opgeslagen! 💪');
}

function updateBodyfatDisplay() {
    if (bodyfatData.current && bodyfatData.goal) {
        document.getElementById('currentBodyfat').value = bodyfatData.current;
        document.getElementById('goalBodyfat').value = bodyfatData.goal;

        // Bereken progress (reversed omdat lager beter is)
        const progress = Math.max(0, Math.min(100,
            ((bodyfatData.current - bodyfatData.goal) / bodyfatData.current) * 100
        ));

        const progressBar = document.getElementById('bodyfatProgress');
        if (progressBar) {
            progressBar.style.width = Math.abs(100 - progress) + '%';
        }
    }
}

// Foto upload voor body fat
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('bodyfatPhotoInput');
    const photoSection = document.getElementById('bodyfatPhoto');

    if (photoSection && photoInput) {
        photoSection.addEventListener('click', () => photoInput.click());

        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    photoSection.style.backgroundImage = `url(${event.target.result})`;
                    photoSection.style.backgroundSize = 'cover';
                    photoSection.style.backgroundPosition = 'center';
                    photoSection.innerHTML = '';

                    // Save to localStorage
                    localStorage.setItem('bodyfatPhoto', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Load saved photo
        const savedPhoto = localStorage.getItem('bodyfatPhoto');
        if (savedPhoto) {
            photoSection.style.backgroundImage = `url(${savedPhoto})`;
            photoSection.style.backgroundSize = 'cover';
            photoSection.style.backgroundPosition = 'center';
            photoSection.innerHTML = '';
        }
    }
});

// VO2 Max
function saveVO2() {
    const current = parseFloat(document.getElementById('currentVO2').value);
    const goal = parseFloat(document.getElementById('goalVO2').value);

    if (!current || !goal) {
        alert('Vul beide waarden in!');
        return;
    }

    vo2Data = {
        current: current,
        goal: goal,
        lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.VO2MAX, JSON.stringify(vo2Data));
    updateVO2Display();
    showNotification('VO2 Max opgeslagen! ❤️');
}

function updateVO2Display() {
    if (vo2Data.current && vo2Data.goal) {
        document.getElementById('currentVO2').value = vo2Data.current;
        document.getElementById('goalVO2').value = vo2Data.goal;

        const displayElement = document.getElementById('vo2Display');
        if (displayElement) {
            displayElement.textContent = vo2Data.current.toFixed(1);
        }

        // Update category
        updateVO2Category(vo2Data.current);

        // Bereken progress
        const progress = Math.min(100, (vo2Data.current / vo2Data.goal) * 100);
        const progressBar = document.getElementById('vo2Progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }
}

function updateVO2Category(vo2) {
    const categoryElement = document.getElementById('vo2Category');
    if (!categoryElement) return;

    let category = '';
    let color = '';

    // Voor mannen (aanpassen op basis van leeftijd 30-40)
    if (vo2 < 35) {
        category = 'Slecht - Werk aan je cardio!';
        color = '#ff5252';
    } else if (vo2 < 40) {
        category = 'Onder gemiddeld - Blijf werken!';
        color = '#ff9800';
    } else if (vo2 < 45) {
        category = 'Gemiddeld - Goed bezig!';
        color = '#ffc107';
    } else if (vo2 < 51) {
        category = 'Goed - Sterke cardio fitness!';
        color = '#4caf50';
    } else if (vo2 < 56) {
        category = 'Uitstekend - Top vorm!';
        color = '#2196f3';
    } else {
        category = 'Superieur - Athleet niveau! 🏆';
        color = '#9c27b0';
    }

    categoryElement.textContent = category;
    categoryElement.style.color = color;
    categoryElement.style.fontWeight = 'bold';
}

// ===== RECEPT FUNCTIES =====

function displayRecipes() {
    const grid = document.getElementById('recipeGrid');

    if (recipes.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666;">Nog geen recepten toegevoegd.</p>';
        return;
    }

    grid.innerHTML = recipes.map(recipe => {
        const macrosDisplay = recipe.macros
            ? `<div class="macros-display">
                <span class="macro-badge protein">🥩 ${recipe.macros.protein}g</span>
                <span class="macro-badge carbs">🍞 ${recipe.macros.carbs}g</span>
                <span class="macro-badge fat">🥑 ${recipe.macros.fat}g</span>
               </div>`
            : '';

        return `
            <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
                <img src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}"
                     alt="${recipe.name}"
                     class="recipe-image"
                     onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <span class="recipe-category">${getCategoryName(recipe.category)}</span>
                    ${macrosDisplay}
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.prepTime} min</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
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

    const macrosSection = recipe.macros
        ? `<div class="recipe-detail-macros">
            <h3>Macronutriënten</h3>
            <div class="macros-bars">
                <div class="macro-bar">
                    <label>Eiwit</label>
                    <div class="bar protein-bar">
                        <span>${recipe.macros.protein}g</span>
                    </div>
                </div>
                <div class="macro-bar">
                    <label>Koolhydraten</label>
                    <div class="bar carbs-bar">
                        <span>${recipe.macros.carbs}g</span>
                    </div>
                </div>
                <div class="macro-bar">
                    <label>Vetten</label>
                    <div class="bar fat-bar">
                        <span>${recipe.macros.fat}g</span>
                    </div>
                </div>
            </div>
            <p class="calories-calc">Totaal: ~${calculateCalories(recipe.macros)} kcal</p>
           </div>`
        : '';

    details.innerHTML = `
        <img src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}"
             alt="${recipe.name}"
             class="recipe-detail-image"
             onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'">
        <h2 class="recipe-detail-title">${recipe.name}</h2>
        <div class="recipe-detail-meta">
            <span>📁 ${getCategoryName(recipe.category)}</span>
            <span>⏱️ ${recipe.prepTime} minuten</span>
        </div>
        ${macrosSection}
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

function calculateCalories(macros) {
    return Math.round((macros.protein * 4) + (macros.carbs * 4) + (macros.fat * 9));
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

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const protein = parseFloat(document.getElementById('recipeProtein').value) || null;
            const carbs = parseFloat(document.getElementById('recipeCarbs').value) || null;
            const fat = parseFloat(document.getElementById('recipeFat').value) || null;

            const macros = (protein || carbs || fat) ? {
                protein: protein || 0,
                carbs: carbs || 0,
                fat: fat || 0
            } : null;

            const recipe = {
                id: Date.now(),
                name: document.getElementById('recipeName').value,
                category: document.getElementById('recipeCategory').value,
                ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(i => i.trim()),
                instructions: document.getElementById('recipeInstructions').value,
                image: document.getElementById('recipeImage').value || '',
                prepTime: parseInt(document.getElementById('recipePrepTime').value),
                macros: macros
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
    }

    // Initialize displays
    displayRecipes();
    updateBodyfatDisplay();
    updateVO2Display();
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
