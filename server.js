const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. المحافظات مع النبذة التعريفية والصور المتحركة
const governates = [
    { 
        GovernateID: 1, 
        GovernateName: { ar: 'القاهرة والجيزة', en: 'Cairo & Giza' },
        Description: { 
            ar: 'عاصمة مصر وقلبها النابض، تدمج بين التاريخ الفرعوني والعتيق وأجواء المعمار الإسلامي، وتزخر بأرقى الفنادق والمطاعم والكافيهات والمعالم الترفيهية.', 
            en: 'The vibrant heart and capital of Egypt, blending ancient Pharaonic heritage, Islamic architecture, luxury hotels, and modern cafes.' 
        },
        Images: [
            'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1572252821143-035a024856f2?auto=format&fit=crop&w=600&q=80'
        ]
    },
    { 
        GovernateID: 2, 
        GovernateName: { ar: 'الفيوم', en: 'Fayoum' },
        Description: { 
            ar: 'واحة طبيعية خلابة تتميز بشلالات وادي الريان وبحيرة قارون، وهي ملاذ مثالي للتخييم والاسترخاء وركوب الخيل وصناعة الفخار التراثي.', 
            en: 'A scenic natural oasis known for Wadi El Rayan waterfalls, Lake Qarun, desert camping, and traditional pottery.' 
        },
        Images: [
            'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
        ]
    },
    { 
        GovernateID: 3, 
        GovernateName: { ar: 'الإسكندرية', en: 'Alexandria' },
        Description: { 
            ar: 'عروس البحر المتوسط، عاصمة مصر الثقافية الكلاسيكية، وتتميز بكورنيشها الساحر، ومكتبة الإسكندرية العالمية، وأشهر مطاعم المأكولات البحرية.', 
            en: 'The Bride of the Mediterranean, famous for its historic seafront corniche, world-class library, and fresh seafood.' 
        },
        Images: [
            'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
        ]
    },
    { 
        GovernateID: 4, 
        GovernateName: { ar: 'الأقصر', en: 'Luxor' },
        Description: { 
            ar: 'أكبر متحف مفتوح في العالم، تضم ثلث آثار العالم من معابد وفراعنة، وتوفر رحلات المنطاد الطائر النادرة فوق النيل والآثار.', 
            en: 'The world’s greatest open-air museum, holding ancient monuments, temples, and hot air balloon rides.' 
        },
        Images: [
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80'
        ]
    },
    { 
        GovernateID: 5, 
        GovernateName: { ar: 'أسوان', en: 'Aswan' },
        Description: { 
            ar: 'أرض السحر والنوبة، تتميز بطبيعتها النيلية الصافية بالجزر والجانيت، وبيوتها النوبية الملونة وطقسها المعتدل والدافئ شتاءً.', 
            en: 'The land of Nubian heritage and serene Nile views, famous for colourful villages and island temples.' 
        },
        Images: [
            'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
        ]
    },
    { 
        GovernateID: 6, 
        GovernateName: { ar: 'سيناء', en: 'Sinai' },
        Description: { 
            ar: 'أرض الفيروز، مهد الجبال الشاهقة ومحميات الغوص العالمية في شرم الشيخ ودهب، وتتميز بالشواطئ الخلابة والسفاري البدوي.', 
            en: 'The Land of Turquoise, offering world-class diving in Sharm El Sheikh & Dahab and desert safaris.' 
        },
        Images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=600&q=80'
        ]
    }
];

// 2. 4 أماكن حقيقية فقط لكل قسم (مطاعم، فنادق، ترفيه/سياحة، كافيهات)
const places = [
    // ==========================================
    // 1. القاهرة والجيزة (16 مكاناً)
    // ==========================================
    // 4 مطاعم
    { PlaceID: 101, GovernateID: 1, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم قصر الكبابجي', en: 'El Kababgy Palace' }, Description: { ar: 'أشهر مطعم مشويات ومأكولات شرقية بجودة عالية.', en: 'Famous oriental grilled meat restaurant.' }, Address: { ar: 'التجمع الخامس والشيخ زايد', en: 'New Cairo & Sheikh Zayed' }, Phone: '16684', MapLink: 'https://maps.google.com/?q=El+Kababgy', TicketPrice: 450, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 102, GovernateID: 1, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم كشري أبوطارق', en: 'Koshary Abou Tarek' }, Description: { ar: 'أشهر وجبة كشري مصرية تقليدية في وسط البلد.', en: 'Famous traditional Koshary in Downtown.' }, Address: { ar: 'وسط البلد، القاهرة', en: 'Downtown, Cairo' }, Phone: '16700', MapLink: 'https://maps.google.com/?q=Koshary+Abou+Tarek', TicketPrice: 50, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 103, GovernateID: 1, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم صبحي كابر', en: 'Sobhy Kaber' }, Description: { ar: 'أشهر طواجن ومشويات شعبية في مصر.', en: 'Famous traditional Egyptian casseroles.' }, Address: { ar: 'شبرا، القاهرة', en: 'Shobra, Cairo' }, Phone: '16640', MapLink: 'https://maps.google.com/?q=Sobhy+Kaber', TicketPrice: 250, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 104, GovernateID: 1, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم زوبا (Zooba)', en: 'Zooba Restaurant' }, Description: { ar: 'إعادة تقديم الأكل الشعبي مثل الفول والطعمية بأسلوب عصري.', en: 'Modern street food experience.' }, Address: { ar: 'الزمالك، القاهرة', en: 'Zamalek, Cairo' }, Phone: '16082', MapLink: 'https://maps.google.com/?q=Zooba+Zamalek', TicketPrice: 120, Rating: 4.5, Image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },

    // 4 فنادق
    { PlaceID: 105, GovernateID: 1, CategoryID: 'hotels', PlaceName: { ar: 'فندق ماريوت الزمالك', en: 'Cairo Marriott Hotel' }, Description: { ar: 'قصر تاريخي 5 نجوم على النيل.', en: '5-star historic palace hotel.' }, Address: { ar: 'الزمالك، القاهرة', en: 'Zamalek, Cairo' }, Phone: '0227283000', MapLink: 'https://maps.google.com/?q=Cairo+Marriott', TicketPrice: 3500, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 106, GovernateID: 1, CategoryID: 'hotels', PlaceName: { ar: 'فندق ماريوت مينا هاوس', en: 'Marriott Mena House' }, Description: { ar: 'إطلالة مباشرة ومذهلة على أهرامات الجيزة.', en: 'Hotel facing the Giza Pyramids directly.' }, Address: { ar: 'الهرم، الجيزة', en: 'Pyramids Road, Giza' }, Phone: '0233773222', MapLink: 'https://maps.google.com/?q=Marriott+Mena+House', TicketPrice: 4200, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 107, GovernateID: 1, CategoryID: 'hotels', PlaceName: { ar: 'فندق النيل ريتز كارلتون', en: 'The Nile Ritz-Carlton' }, Description: { ar: 'فندق فخم بجوار المتحف المصري وميدان التحرير.', en: 'Luxury hotel next to Egyptian Museum.' }, Address: { ar: 'ميدان التحرير، القاهرة', en: 'Tahrir Square, Cairo' }, Phone: '0225778899', MapLink: 'https://maps.google.com/?q=Nile+Ritz+Carlton', TicketPrice: 5000, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 108, GovernateID: 1, CategoryID: 'hotels', PlaceName: { ar: 'فندق شتايجنبرجر التحرير', en: 'Steigenberger El Tahrir' }, Description: { ar: 'فندق 4 نجوم عصري وممتاز جداً في وسط البلد.', en: 'Modern 4-star hotel at Tahrir.' }, Address: { ar: 'ميدان التحرير، القاهرة', en: 'Downtown, Cairo' }, Phone: '0225750777', MapLink: 'https://maps.google.com/?q=Steigenberger+El+Tahrir', TicketPrice: 2200, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },

    // 4 أماكن ترفيه وسياحة
    { PlaceID: 109, GovernateID: 1, CategoryID: 'entertainment', PlaceName: { ar: 'أهرامات الجيزة وأبو الهول', en: 'Giza Pyramids & Sphinx' }, Description: { ar: 'إحدى عجائب الدنيا السبع القديمة وعروض الصوت والضوء.', en: 'Ancient wonder of the world.' }, Address: { ar: 'الهرم، الجيزة', en: 'Giza' }, Phone: '0233838888', MapLink: 'https://maps.google.com/?q=Giza+Pyramids', TicketPrice: 240, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 110, GovernateID: 1, CategoryID: 'entertainment', PlaceName: { ar: 'المتحف المصري الكبير', en: 'Grand Egyptian Museum' }, Description: { ar: 'أكبر متحف في العالم مخصص للحضارة الفرعونية.', en: 'Largest museum dedicated to Egyptian civilization.' }, Address: { ar: 'ميدان الرماية، الجيزة', en: 'Remaya, Giza' }, Phone: '0235317344', MapLink: 'https://maps.google.com/?q=Grand+Egyptian+Museum', TicketPrice: 150, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 111, GovernateID: 1, CategoryID: 'entertainment', PlaceName: { ar: 'برج القاهرة', en: 'Cairo Tower' }, Description: { ar: 'إطلالة بانورامية رائعة بـ 360 درجة على القاهرة والجيزة.', en: '360 degree view of Cairo.' }, Address: { ar: 'الزمالك، القاهرة', en: 'Zamalek, Cairo' }, Phone: '0227365112', MapLink: 'https://maps.google.com/?q=Cairo+Tower', TicketPrice: 70, Rating: 4.5, Image: 'https://images.unsplash.com/photo-1572252821143-035a024856f2?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 112, GovernateID: 1, CategoryID: 'entertainment', PlaceName: { ar: 'حديقة الأزهر', en: 'Al Azhar Park' }, Description: { ar: 'أحدث وأجمل المساحات الخضراء والحدائق المطلة على القاهرة التاريخية.', en: 'Beautiful green park with stunning views.' }, Address: { ar: 'الدراسة، القاهرة', en: 'Darassa, Cairo' }, Phone: '0225103866', MapLink: 'https://maps.google.com/?q=Al+Azhar+Park', TicketPrice: 40, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },

    // 4 كافيهات
    { PlaceID: 113, GovernateID: 1, CategoryID: 'cafes', PlaceName: { ar: 'مقهى الفيشاوي التاريخي', en: 'El Fishawy Cafe' }, Description: { ar: 'أقدم وأشهر مقهى في خان الخليلي منذ عام 1797.', en: 'Historic traditional cafe in Khan El Khalili.' }, Address: { ar: 'خان الخليلي، القاهرة', en: 'Khan El Khalili, Cairo' }, Phone: '0225906752', MapLink: 'https://maps.google.com/?q=El+Fishawy', TicketPrice: 40, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 114, GovernateID: 1, CategoryID: 'cafes', PlaceName: { ar: 'كافيه قهوة (Qahwa)', en: 'Qahwa Cafe' }, Description: { ar: 'أشهر كافيه إفطار وقهوة اختصاصية في الشيخ زايد والتجمع.', en: 'Specialty coffee and breakfast cafe.' }, Address: { ar: 'أركان بلازا، الشيخ زايد', en: 'Arkan Plaza, Zayed' }, Phone: '01022225566', MapLink: 'https://maps.google.com/?q=Qahwa+Arkan', TicketPrice: 110, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 115, GovernateID: 1, CategoryID: 'cafes', PlaceName: { ar: 'كافيه ومطعم ريش التاريخي', en: 'Cafe Riche' }, Description: { ar: 'ملتقى الأدباء والفنانين في وسط البلد منذ عام 1908.', en: 'Famous historic cultural cafe.' }, Address: { ar: 'شارع طلعت حرب، القاهرة', en: 'Downtown, Cairo' }, Phone: '0223935966', MapLink: 'https://maps.google.com/?q=Cafe+Riche', TicketPrice: 90, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 116, GovernateID: 1, CategoryID: 'cafes', PlaceName: { ar: 'كافيه سيلنترو الزمالك', en: 'Cilantro Zamalek' }, Description: { ar: 'كافيه عصري مريح للمشروبات والقهوة.', en: 'Modern coffee shop in Zamalek.' }, Address: { ar: 'الزمالك، القاهرة', en: 'Zamalek, Cairo' }, Phone: '16720', MapLink: 'https://maps.google.com/?q=Cilantro+Zamalek', TicketPrice: 70, Rating: 4.4, Image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },

    // ==========================================
    // 2. الفيوم (16 مكاناً)
    // ==========================================
    // 4 مطاعم الفيوم
    { PlaceID: 201, GovernateID: 2, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم وبدير قرية تونس', en: 'Tunis Village Eco Rest' }, Description: { ar: 'أكل ريفي طازج، فطير مشلتت وحمام محشي في الطبيعة.', en: 'Fresh countryside food and Feteer Meshaltet.' }, Address: { ar: 'قرية تونس، الفيوم', en: 'Tunis Village, Fayoum' }, Phone: '01011112222', MapLink: 'https://maps.google.com/?q=Tunis+Village+Fayoum', TicketPrice: 180, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 202, GovernateID: 2, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم سمك بحيرة قارون', en: 'Qarun Lake Seafood' }, Description: { ar: 'أشهر مطعم مأكولات بحرية وأسماك طازجة على البحيرة مباشرة.', en: 'Seafood restaurant overlooking Lake Qarun.' }, Address: { ar: 'طريق بحيرة قارون، الفيوم', en: 'Lake Qarun Road, Fayoum' }, Phone: '0846332100', MapLink: 'https://maps.google.com/?q=Qarun+Seafood', TicketPrice: 220, Rating: 4.5, Image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 203, GovernateID: 2, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم مشويات طاميه الفيوم', en: 'Tamia Grills Fayoum' }, Description: { ar: 'كباب وكفتة ولحوم بلدي مشوية على الفحم.', en: 'Authentic Egyptian charcoal grills.' }, Address: { ar: 'مركز طاميه، الفيوم', en: 'Tamia, Fayoum' }, Phone: '0842109876', MapLink: 'https://maps.google.com/?q=Tamia+Grills', TicketPrice: 200, Rating: 4.4, Image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 204, GovernateID: 2, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم كشري وساندوتشات الساقية', en: 'El Sakia Restaurant' }, Description: { ar: 'أكل شعبى سريع ولذيذ بجوار سواهد الفيوم.', en: 'Famous local restaurant in Fayoum center.' }, Address: { ar: 'ميدان السواقي، الفيوم', en: 'Sawaqi Square, Fayoum' }, Phone: '0846300111', MapLink: 'https://maps.google.com/?q=Sawaqi+Fayoum', TicketPrice: 60, Rating: 4.3, Image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },

    // 4 فنادق الفيوم
    { PlaceID: 205, GovernateID: 2, CategoryID: 'hotels', PlaceName: { ar: 'فندق وهيلنان أوبيروي الفيوم', en: 'Helnan Auberge Fayoum' }, Description: { ar: 'أعرق فندق ملكي تاريخي على بحيرة قارون.', en: 'Historic royal hotel on Lake Qarun.' }, Address: { ar: 'بحيرة قارون، الفيوم', en: 'Lake Qarun, Fayoum' }, Phone: '0846332800', MapLink: 'https://maps.google.com/?q=Helnan+Auberge+Fayoum', TicketPrice: 2500, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 206, GovernateID: 2, CategoryID: 'hotels', PlaceName: { ar: 'فندق كمب الدكة قرية تونس', en: 'Kom El Dikka Agri Lodge' }, Description: { ar: 'نزل ريفي بيئي ذو طراز متميز في قرية الفخار.', en: 'Eco lodge in Tunis Village.' }, Address: { ar: 'قرية تونس، الفيوم', en: 'Tunis Village, Fayoum' }, Phone: '01222440000', MapLink: 'https://maps.google.com/?q=Kom+El+Dikka', TicketPrice: 1800, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 207, GovernateID: 2, CategoryID: 'hotels', PlaceName: { ar: 'فندق ومنتجع بيوم لجوين', en: 'Byoum Lakeside Hotel' }, Description: { ar: 'منتجع حديث فاخر يحتوي على حمامات سباحة وبحيرة.', en: 'Modern lakeside resort in Fayoum.' }, Address: { ar: 'مدينة بيوم، الفيوم', en: 'Byoum Lakeside, Fayoum' }, Phone: '0846002200', MapLink: 'https://maps.google.com/?q=Byoum+Lakeside', TicketPrice: 2200, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 208, GovernateID: 2, CategoryID: 'hotels', PlaceName: { ar: 'فندق زاد المسافر الفيوم', en: 'Zad El Mosafer Eco Resort' }, Description: { ar: 'منتجع بدوي بسيط ودافئ لعشاق الهدوء والتخييم.', en: 'Traditional eco resort near Tunis village.' }, Address: { ar: 'قارون، الفيوم', en: 'Qarun, Fayoum' }, Phone: '01006007008', MapLink: 'https://maps.google.com/?q=Zad+El+Mosafer', TicketPrice: 1200, Rating: 4.4, Image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },

    // 4 أماكن ترفيه وسياحة الفيوم
    { PlaceID: 209, GovernateID: 2, CategoryID: 'entertainment', PlaceName: { ar: 'محمية وادي الريان والشلالات', en: 'Wadi El Rayan Waterfalls' }, Description: { ar: 'شلالات صحراوية طبيعية وتزحلق على الرمال والتخييم.', en: 'Natural desert waterfalls and lakes.' }, Address: { ar: 'وادي الريان، الفيوم', en: 'Wadi El Rayan, Fayoum' }, Phone: '0846330000', MapLink: 'https://maps.google.com/?q=Wadi+El+Rayan', TicketPrice: 50, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 210, GovernateID: 2, CategoryID: 'entertainment', PlaceName: { ar: 'محمية وادي الحيتان العالمية', en: 'Wadi El Hitan (Whale Valley)' }, Description: { ar: 'موقع تراث عالمي يحتوي على هياكل حيتان متحجرة من 40 مليون سنة.', en: 'UNESCO World Heritage fossil site.' }, Address: { ar: 'صحراء الفيوم', en: 'Fayoum Desert' }, Phone: '0846330001', MapLink: 'https://maps.google.com/?q=Wadi+El+Hitan', TicketPrice: 100, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 211, GovernateID: 2, CategoryID: 'entertainment', PlaceName: { ar: 'قرية تونس وصناعة الفخار', en: 'Tunis Pottery Village' }, Description: { ar: 'قرية سياحية ساحرة شهيرة بوررش صناعة الفخار الملون.', en: 'Famous arts and pottery village.' }, Address: { ar: 'قرية تونس، الفيوم', en: 'Tunis Village, Fayoum' }, Phone: '01011110000', MapLink: 'https://maps.google.com/?q=Tunis+Village', TicketPrice: 0, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 212, GovernateID: 2, CategoryID: 'entertainment', PlaceName: { ar: 'ميدان وسواقي الهدير التاريخية', en: 'Fayoum Waterwheels' }, Description: { ar: 'رمز الفيوم التاريخي لنقل المياه والمزار الشهير في قلب المدينة.', en: 'Historic wooden waterwheels in Fayoum.' }, Address: { ar: 'وسط البلد، الفيوم', en: 'City Center, Fayoum' }, Phone: '0846331111', MapLink: 'https://maps.google.com/?q=Fayoum+Waterwheels', TicketPrice: 0, Rating: 4.4, Image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },

    // 4 كافيهات الفيوم
    { PlaceID: 213, GovernateID: 2, CategoryID: 'cafes', PlaceName: { ar: 'كافيه قهوة ودكة قرية تونس', en: 'Tunis Pottery Cafe' }, Description: { ar: 'جلسة عربية هادئة ومشروبات طبيعية في قرية تونس.', en: 'Cozy cafe in Tunis village.' }, Address: { ar: 'قرية تونس، الفيوم', en: 'Tunis Village, Fayoum' }, Phone: '01001112233', MapLink: 'https://maps.google.com/?q=Tunis+Cafe', TicketPrice: 50, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 214, GovernateID: 2, CategoryID: 'cafes', PlaceName: { ar: 'كافيه سواقي الفيوم', en: 'Sawaqi View Cafe' }, Description: { ar: 'كافيه بإطلالة مباشرة على سواقي الفيوم التراثية.', en: 'Cafe facing the waterwheels.' }, Address: { ar: 'ميدان السواقي، الفيوم', en: 'Sawaqi Square, Fayoum' }, Phone: '0846339900', MapLink: 'https://maps.google.com/?q=Sawaqi+Cafe', TicketPrice: 40, Rating: 4.3, Image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 215, GovernateID: 2, CategoryID: 'cafes', PlaceName: { ar: 'كافيه ومصنع الورد الفيومي', en: 'Rose Garden Cafe' }, Description: { ar: 'مشروبات عصرية وسط الزهور والحدائق.', en: 'Garden coffee shop in Fayoum.' }, Address: { ar: 'طريق بحيرة قارون، الفيوم', en: 'Lake Road, Fayoum' }, Phone: '0846300444', MapLink: 'https://maps.google.com/?q=Rose+Garden+Fayoum', TicketPrice: 60, Rating: 4.5, Image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 216, GovernateID: 2, CategoryID: 'cafes', PlaceName: { ar: 'كافيه ليالي قارون', en: 'Qarun Lounge' }, Description: { ar: 'جلسات مسائية ومشروبات ساحرة على بحيرة قارون.', en: 'Lakeside night cafe.' }, Address: { ar: 'شاطئ بحيرة قارون، الفيوم', en: 'Lake Shore, Fayoum' }, Phone: '0846300777', MapLink: 'https://maps.google.com/?q=Qarun+Lounge', TicketPrice: 70, Rating: 4.4, Image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },

    // ==========================================
    // 3. الإسكندرية (16 مكاناً)
    // ==========================================
    // 4 مطاعم الإسكندرية
    { PlaceID: 301, GovernateID: 3, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم قدورة للأسماك', en: 'Kadoura Seafood' }, Description: { ar: 'أشهر مطعم مأكولات بحرية طازجة في عروس البحر المتوسط.', en: 'Famous seafood venue in Alexandria.' }, Address: { ar: 'بحري، الإسكندرية', en: 'Bahary, Alexandria' }, Phone: '034800400', MapLink: 'https://maps.google.com/?q=Kadoura+Alexandria', TicketPrice: 350, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 302, GovernateID: 3, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم بلبع للمشويات والأسماك', en: 'Balbaa Grill & Seafood' }, Description: { ar: 'قلعة المشويات والسي فود في منطقة سيدي بشر.', en: 'Huge oriental grills and seafood restaurant.' }, Address: { ar: 'سيدي بشر، الإسكندرية', en: 'Sidi Bishr, Alexandria' }, Phone: '16941', MapLink: 'https://maps.google.com/?q=Balbaa+Alexandria', TicketPrice: 300, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 303, GovernateID: 3, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم وحلواني ديلسبس', en: 'DeLesseps Alexandria' }, Description: { ar: 'مأكولات إيطالية وبحرية على كورنيش محطة الرمل.', en: 'Italian & seafood restaurant overlooking the sea.' }, Address: { ar: 'محطة الرمل، الإسكندرية', en: 'Mahattat El Raml, Alexandria' }, Phone: '034870000', MapLink: 'https://maps.google.com/?q=DeLesseps+Alex', TicketPrice: 280, Rating: 4.5, Image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },
    { PlaceID: 304, GovernateID: 3, CategoryID: 'restaurants', PlaceName: { ar: 'مطعم كبدة الفلاح', en: 'Wahba Liver Alexandria' }, Description: { ar: 'أشهر وأقدم سندوتشات كبدة إسكندراني أصلية في مصر.', en: 'Authentic Alexandrian liver sandwiches.' }, Address: { ar: 'محطة الرمل، الإسكندرية', en: 'Downtown, Alexandria' }, Phone: '034801122', MapLink: 'https://maps.google.com/?q=Wahba+Liver', TicketPrice: 50, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'مطاعم', en: 'Restaurants' }, Reviews: [] },

    // 4 فنادق الإسكندرية
    { PlaceID: 305, GovernateID: 3, CategoryID: 'hotels', PlaceName: { ar: 'فندق فورسيزونز سان ستيفانو', en: 'Four Seasons San Stefano' }, Description: { ar: 'أرقى فندق 5 نجوم مع شاطئ خاص بالمنتزه وسان ستيفانو.', en: '5-star luxury beachfront hotel.' }, Address: { ar: 'سان ستيفانو، الإسكندرية', en: 'San Stefano, Alexandria' }, Phone: '035818000', MapLink: 'https://maps.google.com/?q=Four+Seasons+Alexandria', TicketPrice: 5500, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 306, GovernateID: 3, CategoryID: 'hotels', PlaceName: { ar: 'فندق سيسل إسكندرية', en: 'Steigenberger Cecil Hotel' }, Description: { ar: 'فندق كلاسيكي تاريخي يقع في قلب محطة الرمل على البحر مباشرة.', en: 'Classic historical hotel facing Alexandria harbor.' }, Address: { ar: 'محطة الرمل، الإسكندرية', en: 'Ramleh Square, Alexandria' }, Phone: '034877196', MapLink: 'https://maps.google.com/?q=Cecil+Hotel+Alexandria', TicketPrice: 2800, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 307, GovernateID: 3, CategoryID: 'hotels', PlaceName: { ar: 'فندق هيلتون كورنيش الإسكندرية', en: 'Hilton Alexandria Corniche' }, Description: { ar: 'فندق ممتازة بإطلالة رائعة وحمام سباحة على الروف.', en: 'Nile view hotel with rooftop pool.' }, Address: { ar: 'الشاطبي، الإسكندرية', en: 'Shatby, Alexandria' }, Phone: '035490935', MapLink: 'https://maps.google.com/?q=Hilton+Alexandria', TicketPrice: 3200, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },
    { PlaceID: 308, GovernateID: 3, CategoryID: 'hotels', PlaceName: { ar: 'فندق فلسطين قصر المنتزه', en: 'Helnan Palestine Hotel' }, Description: { ar: 'داخل حدائق قصر المنتزه المطلة على البحر مباشرة.', en: 'Located inside Montaza Palace Gardens.' }, Address: { ar: 'المنتزه، الإسكندرية', en: 'El Montaza, Alexandria' }, Phone: '035473500', MapLink: 'https://maps.google.com/?q=Helnan+Palestine', TicketPrice: 3000, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'فنادق', en: 'Hotels' }, Reviews: [] },

    // 4 أماكن ترفيه وسياحة الإسكندرية
    { PlaceID: 309, GovernateID: 3, CategoryID: 'entertainment', PlaceName: { ar: 'قلعة قايتباي', en: 'Citadel of Qaitbay' }, Description: { ar: 'حصن دفاعي تاريخي يعود للقرن 15 في موقع منار الإسكندرية القديم.', en: '15th-century fortress on Mediterranean shore.' }, Address: { ar: 'الأنفوشي، الإسكندرية', en: 'Anfoushi, Alexandria' }, Phone: '034865177', MapLink: 'https://maps.google.com/?q=Citadel+of+Qaitbay', TicketPrice: 100, Rating: 4.8, Image: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 310, GovernateID: 3, CategoryID: 'entertainment', PlaceName: { ar: 'مكتبة الإسكندرية العالمية', en: 'Bibliotheca Alexandrina' }, Description: { ar: 'أكبر مركز ثقافي ومكتبة حديثة تحيي مكتبة الإسكندرية القديمة.', en: 'Major library and cultural center.' }, Address: { ar: 'الشاطبي، الإسكندرية', en: 'Shatby, Alexandria' }, Phone: '034839999', MapLink: 'https://maps.google.com/?q=Bibliotheca+Alexandrina', TicketPrice: 50, Rating: 4.9, Image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 311, GovernateID: 3, CategoryID: 'entertainment', PlaceName: { ar: 'حدائق وكوبري المنتزه', en: 'Montaza Palace Gardens' }, Description: { ar: 'حدائق ملكية شاسعة وقصر الخديوي عباس حلمي الثاني وشواطئ خلابة.', en: 'Royal gardens and seaside complex.' }, Address: { ar: 'المنتزه، الإسكندرية', en: 'Montaza, Alexandria' }, Phone: '035470000', MapLink: 'https://maps.google.com/?q=Montaza+Gardens', TicketPrice: 25, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },
    { PlaceID: 312, GovernateID: 3, CategoryID: 'entertainment', PlaceName: { ar: 'المتحف اليوناني الروماني', en: 'Greco-Roman Museum' }, Description: { ar: 'متحف يضم آلاف القطع الآثارية الفريدة من العصرين اليوناني والروماني.', en: 'Museum dedicated to Alexandrian history.' }, Address: { ar: 'وسط البلد، الإسكندرية', en: 'Downtown, Alexandria' }, Phone: '034865800', MapLink: 'https://maps.google.com/?q=Greco+Roman+Museum', TicketPrice: 80, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'أماكن ترفيه وسياحة', en: 'Entertainment & Tourism' }, Reviews: [] },

    // 4 كافيهات الإسكندرية
    { PlaceID: 313, GovernateID: 3, CategoryID: 'cafes', PlaceName: { ar: 'مقهى ديلسبس التاريخي', en: 'Trianon Cafe Alexandria' }, Description: { ar: 'أقدم مقهى وحلواني كلاسيكي في الإسكندرية منذ القرن الماضي.', en: 'Historic European style cafe in Alex.' }, Address: { ar: 'محطة الرمل، الإسكندرية', en: 'Ramleh, Alexandria' }, Phone: '034860000', MapLink: 'https://maps.google.com/?q=Trianon+Alexandria', TicketPrice: 80, Rating: 4.6, Image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 314, GovernateID: 3, CategoryID: 'cafes', PlaceName: { ar: 'كافيه وتريانون البحر', en: 'Latino Cafe Alex' }, Description: { ar: 'كافيه بلكونة مفتوح مباشرة على البحر المتوسط بصورة ساحرة.', en: 'Seaview terrace cafe.' }, Address: { ar: 'جليم البحر، الإسكندرية', en: 'Glim, Alexandria' }, Phone: '035830000', MapLink: 'https://maps.google.com/?q=Latino+Cafe+Alex', TicketPrice: 100, Rating: 4.7, Image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 315, GovernateID: 3, CategoryID: 'cafes', PlaceName: { ar: 'كافيه سانتوس الإسكندرية', en: 'Santos Cafe' }, Description: { ar: 'قهوة ممتازة ومشروبات مع إطلالة على قلعة قايتباي.', en: 'Cafe facing Citadel of Qaitbay.' }, Address: { ar: 'بحري، الإسكندرية', en: 'Bahary, Alexandria' }, Phone: '034800111', MapLink: 'https://maps.google.com/?q=Santos+Cafe', TicketPrice: 60, Rating: 4.5, Image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] },
    { PlaceID: 316, GovernateID: 3, CategoryID: 'cafes', PlaceName: { ar: 'كافيه أثينوس التاريخي', en: 'Athineos Cafe' }, Description: { ar: 'كافيه يوناني كلاسيكي عريق في محطة الرمل.', en: 'Greek heritage cafe in Alexandria.' }, Address: { ar: 'محطة الرمل، الإسكندرية', en: 'Mahattat El Raml, Alex' }, Phone: '034864444', MapLink: 'https://maps.google.com/?q=Athineos+Cafe', TicketPrice: 70, Rating: 4.4, Image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80', CategoryName: { ar: 'كافيهات', en: 'Cafes' }, Reviews: [] }
];

app.get('/api/governates', (req, res) => res.json(governates));

app.get('/api/places', (req, res) => {
    const { governateId, categoryId, search } = req.query;
    let filtered = places;

    if (governateId) filtered = filtered.filter(p => p.GovernateID == governateId);
    if (categoryId && categoryId !== 'all') filtered = filtered.filter(p => p.CategoryID === categoryId);
    if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => 
            p.PlaceName.ar.toLowerCase().includes(s) || p.PlaceName.en.toLowerCase().includes(s) ||
            p.Description.ar.toLowerCase().includes(s) || p.Description.en.toLowerCase().includes(s)
        );
    }

    res.json(filtered);
});

app.post('/api/places/:id/reviews', (req, res) => {
    const placeId = parseInt(req.params.id);
    const { userName, rating, comment } = req.body;
    const place = places.find(p => p.PlaceID === placeId);
    if (!place) return res.status(404).send('Place not found');

    const newReview = { userName: userName || 'زائر', rating: parseInt(rating) || 5, comment: comment || '', date: new Date().toLocaleDateString() };
    place.Reviews.push(newReview);
    res.json({ message: 'Success', reviews: place.Reviews });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));