const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 1. API المحافظات
app.get('/api/governorates', (req, res) => {
  res.json([
    { id: 1, name: 'القاهرة والجيزة' },
    { id: 2, name: 'الفيوم' },
    { id: 3, name: 'الإسكندرية' },
    { id: 4, name: 'الأقصر' },
    { id: 5, name: 'أسوان' },
    { id: 6, name: 'سيناء' }
  ]);
});

// 2. API أماكن الخروجات (بكل المسميات المحتملة للـ Frontend)
app.get('/api/places', (req, res) => {
  const { governateId, categoryId } = req.query;

  const dummyPlaces = [
    {
      id: 101,
      name: 'أهرامات الجيزة',
      title: 'أهرامات الجيزة',
      description: 'إحدى عجائب الدنيا السبع ومن أهم المعالم التاريخية في مصر.',
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac25264ba?w=500',
      governateId: 1,
      categoryId: 'historical',
      ticketPrice: '60 جنيه',
      price: '60 جنيه',
      phone: '0233771111',
      address: 'الهرم، الجيزة',
      mapUrl: 'https://maps.google.com',
      rating: 4.8
    },
    {
      id: 102,
      name: 'برج القاهرة',
      title: 'برج القاهرة',
      description: 'تحفة معمارية توفر إطلالة ساحرة على مدينة القاهرة النيلية.',
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=500',
      governateId: 1,
      categoryId: 'entertainment',
      ticketPrice: '70 جنيه',
      price: '70 جنيه',
      phone: '0227365112',
      address: 'الزمالك، القاهرة',
      mapUrl: 'https://maps.google.com',
      rating: 4.6
    },
    {
      id: 201,
      name: 'وادي الريان',
      title: 'وادي الريان',
      description: 'م محمية طبيعية رائعة تضم شلالات وبحيرات وصحراء ساحرة.',
      image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=500',
      governateId: 2,
      categoryId: 'entertainment',
      ticketPrice: '50 جنيه',
      price: '50 جنيه',
      phone: '0842090000',
      address: 'محمية وادي الريان، الفيوم',
      mapUrl: 'https://maps.google.com',
      rating: 4.7
    },
    {
      id: 301,
      name: 'قلعة قايتباي',
      title: 'قلعة قايتباي',
      description: 'قلعة أثرية حصينة على شاطئ البحر الأبيض المتوسط بالإسكندرية.',
      image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=500',
      governateId: 3,
      categoryId: 'historical',
      ticketPrice: '60 جنيه',
      price: '60 جنيه',
      phone: '034865100',
      address: 'الأنفوشي، الإسكندرية',
      mapUrl: 'https://maps.google.com',
      rating: 4.5
    }
  ];

  let filtered = dummyPlaces;

  if (governateId) {
    filtered = filtered.filter(p => String(p.governateId) === String(governateId));
  }

  if (categoryId && categoryId !== 'all') {
    filtered = filtered.filter(p => String(p.categoryId) === String(categoryId));
  }

  // نرجع البيانات مباشرة لتدعم الـ Frontend
  res.json(filtered);
});

// توجيه أي مسار آخر لصفحة index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
