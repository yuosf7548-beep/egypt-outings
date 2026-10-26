const API_BASE = '';
let currentLang = localStorage.getItem('appLang') || 'ar';
let allPlacesData = [];
let governatesData = [];
let activePlaceId = null;
let currentUser = localStorage.getItem('userName') || null;
let activeGovId = null;
let activeGovNameObj = null;
let activeGovDescObj = null;
let currentCategoryFilter = 'all';

const translations = {
    ar: {
        logo: 'دليل خروجات مصر',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        heroTitle: 'اكتشف أروع الخروجات والأماكن في مصر',
        heroSub: 'اختر المحافظة وتعرف على الأسعار والتقييمات ورقم الاتصال والموقع',
        searchPlaceholder: 'ابحث عن اسم مكان، مطعم، فندق، أو محافظة...',
        searchBtn: 'بحث 🔍',
        backBtn: '← العودة للمحافظات',
        mainTitle: 'استكشف المحافظات',
        placesTitlePrefix: 'أماكن في ',
        searchResultsPrefix: 'نتائج البحث عن: ',
        priceLabel: '🎟️ سعر التذكرة:',
        phoneLabel: '📞 رقم الاتصال:',
        addressLabel: '📍 العنوان التفصيلي:',
        mapBtn: '🗺️ فتح الموقع على الخريطة (Google Maps)',
        reviewsTitle: '💬 تقييمات وتعليقات الزوار',
        addReviewHeader: 'أضف تقييمك ورأيك:',
        ratingLabel: 'التقييم:',
        reviewPlaceholder: 'اكتب تجربتك أو رأيك هنا...',
        submitReviewBtn: 'إرسال التقييم ✍️',
        loginHeader: 'تسجيل الدخول',
        nameLabel: 'الاسم (ليظهر في الموقع)',
        emailLabel: 'البريد الإلكتروني',
        passwordLabel: 'كلمة المرور',
        loginSubmitBtn: 'دخول',
        detailsBtn: 'التفاصيل والتقييم 📄',
        clickToExplore: 'اضغط لاستكشاف المعالم والأماكن',
        freePrice: '✨ مجاني / حسب الطلب',
        egp: 'جنيه مصري',
        welcome: 'أهلاً بك، ',
        allFilter: 'الكل',
        restaurantsFilter: '🍽️ المطاعم',
        hotelsFilter: '🏨 الفنادق',
        entertainmentFilter: '🎡 أماكن سياحية وترفيه',
        cafesFilter: '☕ كافيهات'
    },
    en: {
        logo: 'Egypt Outings Guide',
        login: 'Sign In',
        logout: 'Logout',
        heroTitle: 'Discover Top Destinations in Egypt',
        heroSub: 'Select a Governorate to explore attractions, hotels, restaurants, and reviews',
        searchPlaceholder: 'Search for places, hotels, restaurants...',
        searchBtn: 'Search 🔍',
        backBtn: '← Back to Governorates',
        mainTitle: 'Explore Governorates',
        placesTitlePrefix: 'Places in ',
        searchResultsPrefix: 'Search Results for: ',
        priceLabel: '🎟️ Ticket Price:',
        phoneLabel: '📞 Contact Phone:',
        addressLabel: '📍 Address:',
        mapBtn: '🗺️ View Location on Google Maps',
        reviewsTitle: '💬 Visitor Reviews',
        addReviewHeader: 'Add Your Review:',
        ratingLabel: 'Rating:',
        reviewPlaceholder: 'Write your experience...',
        submitReviewBtn: 'Submit Review ✍️',
        loginHeader: 'Sign In',
        nameLabel: 'Full Name',
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        loginSubmitBtn: 'Login',
        detailsBtn: 'Details & Reviews 📄',
        clickToExplore: 'Click to explore attractions',
        freePrice: '✨ Free Entrance',
        egp: 'EGP',
        welcome: 'Welcome, ',
        allFilter: 'All',
        restaurantsFilter: '🍽️ Restaurants',
        hotelsFilter: '🏨 Hotels',
        entertainmentFilter: '🎡 Tourism & Fun',
        cafesFilter: '☕ Cafes'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    checkUserAuthStatus();
    loadGovernates();
});

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('appLang', currentLang);
    applyLanguage(currentLang);

    if (activeGovId) {
        openGovernatePlaces(activeGovId, activeGovNameObj, activeGovDescObj);
    } else {
        loadGovernates();
    }
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.innerText = lang === 'ar' ? 'English 🌐' : 'عربي 🌐';

    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang][key]) {
            elem.innerText = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-key-placeholder]').forEach(elem => {
        const key = elem.getAttribute('data-key-placeholder');
        if (translations[lang][key]) {
            elem.placeholder = translations[lang][key];
        }
    });
}

function checkUserAuthStatus() {
    const userArea = document.getElementById('userArea');
    if (!userArea) return;
    const t = translations[currentLang];
    if (currentUser) {
        userArea.innerHTML = `
            <span class="user-greeting" style="color:white; font-weight:bold; margin:0 10px;">${t.welcome}${currentUser} 👋</span>
            <button class="btn-logout" onclick="handleLogout()">${t.logout}</button>
        `;
    } else {
        userArea.innerHTML = `<button class="btn-auth" onclick="openLoginModal()">${t.login}</button>`;
    }
}

// 1. عرض المحافظات
async function loadGovernates() {
    activeGovId = null;
    activeGovNameObj = null;
    activeGovDescObj = null;
    const backBtn = document.getElementById('btnBackToGovs');
    if (backBtn) backBtn.style.display = 'none';
    
    const secTitle = document.getElementById('sectionTitle');
    if (secTitle) secTitle.innerHTML = `<h2 class="gov-title-header">${translations[currentLang].mainTitle}</h2>`;
    
    const container = document.getElementById('mainContainer');
    if (!container) return;
    container.innerHTML = `<div style="text-align:center; width:100%; font-size:18px; grid-column:1/-1;">... ⏳</div>`;

    try {
        const res = await fetch(`${API_BASE}/governates`);
        governatesData = await res.json();

        container.innerHTML = governatesData.map(gov => `
            <div class="gov-card" onclick='openGovernatePlaces(${gov.GovernateID || gov.id}, ${JSON.stringify(gov.GovernateName || gov.name)}, ${JSON.stringify(gov.Description || gov.description)})'>
                <div class="gov-slider-container" id="slider-${gov.GovernateID || gov.id}">
                    <img src="${gov.Images ? gov.Images[0] : gov.image}" class="gov-slider-img active" alt="Gov">
                    ${gov.Images && gov.Images[1] ? `<img src="${gov.Images[1]}" class="gov-slider-img" alt="Gov">` : ''}
                    ${gov.Images && gov.Images[2] ? `<img src="${gov.Images[2]}" class="gov-slider-img" alt="Gov">` : ''}
                </div>
                <div class="gov-info">
                    <h3>📍 ${typeof (gov.GovernateName || gov.name) === 'object' ? (gov.GovernateName || gov.name)[currentLang] : (gov.GovernateName || gov.name)}</h3>
                    <p style="font-size:0.9rem; color:#555; margin:8px 0; line-height:1.4;">${typeof (gov.Description || gov.description) === 'object' ? (gov.Description || gov.description)[currentLang] : (gov.Description || gov.description)}</p>
                    <span style="color:#1e3c72; font-weight:bold; font-size:0.9rem;">${translations[currentLang].clickToExplore} ←</span>
                </div>
            </div>
        `).join('');

        startGovImageSliders();

    } catch (err) {
        container.innerHTML = `<div style="text-align:center; color:red; grid-column:1/-1;">Failed to load data</div>`;
    }
}

function startGovImageSliders() {
    governatesData.forEach(gov => {
        const govId = gov.GovernateID || gov.id;
        const sliderContainer = document.getElementById(`slider-${govId}`);
        if (!sliderContainer) return;
        
        const images = sliderContainer.querySelectorAll('.gov-slider-img');
        if (images.length <= 1) return;
        let currentIndex = 0;

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000);
    });
}

function showGovernatesView() {
    loadGovernates();
}

// 2. فتح أماكن المحافظة
async function openGovernatePlaces(govId, govNameObj, govDescObj, categoryFilter = 'all') {
    activeGovId = govId;
    activeGovNameObj = govNameObj;
    activeGovDescObj = govDescObj;
    currentCategoryFilter = categoryFilter;

    const backBtn = document.getElementById('btnBackToGovs');
    if (backBtn) backBtn.style.display = 'inline-block';
    const t = translations[currentLang];

    const govNameStr = typeof govNameObj === 'object' ? govNameObj[currentLang] : govNameObj;
    const govDescStr = typeof govDescObj === 'object' ? govDescObj[currentLang] : govDescObj;

    const descHtml = govDescStr ? `<div class="gov-description-large">${govDescStr}</div>` : '';
    
    const filterBarHtml = `
        <div class="internal-filter-bar">
            <button class="filter-btn ${categoryFilter === 'all' ? 'active' : ''}" onclick="filterGovernatePlaces('all')">${t.allFilter}</button>
            <button class="filter-btn ${categoryFilter === 'restaurants' ? 'active' : ''}" onclick="filterGovernatePlaces('restaurants')">${t.restaurantsFilter}</button>
            <button class="filter-btn ${categoryFilter === 'hotels' ? 'active' : ''}" onclick="filterGovernatePlaces('hotels')">${t.hotelsFilter}</button>
            <button class="filter-btn ${categoryFilter === 'entertainment' ? 'active' : ''}" onclick="filterGovernatePlaces('entertainment')">${t.entertainmentFilter}</button>
            <button class="filter-btn ${categoryFilter === 'cafes' ? 'active' : ''}" onclick="filterGovernatePlaces('cafes')">${t.cafesFilter}</button>
        </div>
    `;

    const secTitle = document.getElementById('sectionTitle');
    if (secTitle) {
        secTitle.innerHTML = `
            <h2 class="gov-title-header">${t.placesTitlePrefix} ${govNameStr}</h2>
            ${descHtml}
            ${filterBarHtml}
        `;
    }

    const container = document.getElementById('mainContainer');
    if (!container) return;
    container.innerHTML = `<div style="text-align:center; width:100%; font-size:18px; grid-column:1/-1;">... ⏳</div>`;

    try {
        const url = categoryFilter === 'all' 
            ? `${API_BASE}/api/places?governateId=${govId}` 
            : `${API_BASE}/api/places?governateId=${govId}&categoryId=${categoryFilter}`;

        const res = await fetch(url);
        allPlacesData = await res.json();
        renderPlacesList(allPlacesData);
    } catch (err) {
        container.innerHTML = `<div style="text-align:center; color:red; grid-column:1/-1;">Error loading places</div>`;
    }
}

function filterGovernatePlaces(categoryFilter) {
    if (activeGovId) {
        openGovernatePlaces(activeGovId, activeGovNameObj, activeGovDescObj, categoryFilter);
    }
}

function searchPlaces() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const search = searchInput.value;
    if (!search) return;

    activeGovId = null;
    const backBtn = document.getElementById('btnBackToGovs');
    if (backBtn) backBtn.style.display = 'inline-block';
    
    const secTitle = document.getElementById('sectionTitle');
    if (secTitle) secTitle.innerHTML = `<h2 class="gov-title-header">${translations[currentLang].searchResultsPrefix} "${search}"</h2>`;

    fetch(`${API_BASE}/api/places?search=${encodeURIComponent(search)}`)
        .then(res => res.json())
        .then(data => {
            allPlacesData = data;
            renderPlacesList(data);
        });
}

function renderPlacesList(places) {
    const container = document.getElementById('mainContainer');
    if (!container) return;
    const t = translations[currentLang];

    if (!places || places.length === 0) {
        container.innerHTML = `<div style="text-align:center; width:100%; color:#777; grid-column:1/-1;">🔍 لا توجد أماكن في هذا التصنيف حالياً</div>`;
        return;
    }

    container.innerHTML = places.map(place => {
        const placeName = typeof place.PlaceName === 'object' ? place.PlaceName[currentLang] : (place.name || place.title);
        const placeAddress = typeof place.Address === 'object' ? place.Address[currentLang] : place.address;
        const placeDesc = typeof place.Description === 'object' ? place.Description[currentLang] : place.description;
        const placeCat = typeof place.CategoryName === 'object' ? place.CategoryName[currentLang] : place.categoryId;
        const placeImg = place.Image || place.image;
        const placeRating = place.Rating || place.rating || '4.5';
        const placePrice = place.TicketPrice || place.price;
        const placeId = place.PlaceID || place.id;

        return `
            <div class="place-card">
                <div class="place-img-holder">
                    <img src="${placeImg}" alt="${placeName}">
                    <span class="badge-category">${placeCat}</span>
                </div>
                <div class="place-details">
                    <div class="place-header">
                        <h3>${placeName}</h3>
                        <span class="rating">⭐ ${placeRating}</span>
                    </div>
                    <p class="gov-name">📍 ${placeAddress}</p>
                    <p class="description">${placeDesc}</p>
                    <div class="place-footer">
                        <span class="price">${placePrice ? `🎟️ ${placePrice} ${t.egp}` : t.freePrice}</span>
                        <button class="btn-details" onclick="openDetailsModal(${placeId})">${t.detailsBtn}</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// التفاصيل والتعليقات
function openDetailsModal(placeId) {
    activePlaceId = placeId;
    const place = allPlacesData.find(p => (p.PlaceID === placeId || p.id === placeId));
    if (!place) return;
    const t = translations[currentLang];

    const placeName = typeof place.PlaceName === 'object' ? place.PlaceName[currentLang] : (place.name || place.title);
    const placeAddress = typeof place.Address === 'object' ? place.Address[currentLang] : place.address;
    const placeDesc = typeof place.Description === 'object' ? place.Description[currentLang] : place.description;
    const placeCat = typeof place.CategoryName === 'object' ? place.CategoryName[currentLang] : place.categoryId;
    const placeImg = place.Image || place.image;
    const placePrice = place.TicketPrice || place.price;
    const placePhone = place.Phone || place.phone || 'N/A';
    const placeMap = place.MapLink || place.mapUrl || '#';

    document.getElementById('modalImg').src = placeImg;
    document.getElementById('modalTitle').innerText = placeName;
    document.getElementById('modalGovCat').innerText = `📍 ${placeAddress} | 🏷️ ${placeCat}`;
    document.getElementById('modalDesc').innerText = placeDesc;
    document.getElementById('modalPrice').innerText = placePrice ? `${placePrice} ${t.egp}` : t.freePrice;
    document.getElementById('modalPhone').innerText = placePhone;
    document.getElementById('modalAddress').innerText = placeAddress;
    document.getElementById('modalMapLink').href = placeMap;

    renderReviews(place.Reviews || place.reviews);
    document.getElementById('detailsModal').style.display = 'flex';
}

function renderReviews(reviews) {
    const list = document.getElementById('reviewsList');
    if (!list) return;
    if (!reviews || reviews.length === 0) {
        list.innerHTML = `<p style="color:#777; font-size:0.85rem;">${currentLang === 'ar' ? 'لا توجد تقييمات سابقة.' : 'No reviews yet.'}</p>`;
        return;
    }

    list.innerHTML = reviews.map(r => `
        <div class="review-item">
            <div class="review-item-header">
                <span>👤 ${r.userName || r.name}</span>
                <span>⭐ ${r.rating}/5</span>
            </div>
            <div class="review-item-comment">${r.comment}</div>
        </div>
    `).join('');
}

async function submitReview(e) {
    e.preventDefault();
    if (!activePlaceId) return;

    const ratingElem = document.getElementById('reviewRating');
    const commentElem = document.getElementById('reviewComment');
    if (!ratingElem || !commentElem) return;

    const rating = ratingElem.value;
    const comment = commentElem.value;
    const userName = currentUser || (currentLang === 'ar' ? 'زائر' : 'Visitor');

    try {
        const res = await fetch(`${API_BASE}/api/places/${activePlaceId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, rating, comment })
        });
        const data = await res.json();

        const place = allPlacesData.find(p => (p.PlaceID === activePlaceId || p.id === activePlaceId));
        if (place) {
            place.Reviews = data.reviews;
            renderReviews(place.Reviews);
        }

        commentElem.value = '';
        alert(currentLang === 'ar' ? 'تم إضافة تقييمك بنجاح!' : 'Review submitted successfully!');
    } catch (err) {
        alert('Failed');
    }
}

function closeDetailsModal() { 
    const modal = document.getElementById('detailsModal');
    if (modal) modal.style.display = 'none'; 
}
function openLoginModal() { 
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'flex'; 
}
function closeLoginModal() { 
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'none'; 
}

function handleLogin(e) {
    e.preventDefault();
    const loginNameElem = document.getElementById('loginName');
    if (!loginNameElem) return;
    const name = loginNameElem.value;
    currentUser = name;
    localStorage.setItem('userName', name);
    checkUserAuthStatus();
    closeLoginModal();
    alert(currentLang === 'ar' ? `أهلاً بك يا ${name}!` : `Welcome ${name}!`);
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('userName');
    checkUserAuthStatus();
    alert(currentLang === 'ar' ? 'تم تسجيل الخروج بنجاح.' : 'Logged out successfully.');
}
