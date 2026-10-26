const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// تقديم الملفات الثابتة (HTML, CSS, JS)
app.use(express.static(__dirname));

// 1. API المحافظات
app.get('/api/governorates', (req, res) => {
  try {
    const governorates = [
      { id: 1, name: 'القاهرة والجيزة' },
      { id: 2, name: 'الفيوم' },
      { id: 3, name: 'الإسكندرية' },
      { id: 4, name: 'الأقصر' },
      { id: 5, name: 'أسوان' },
      { id: 6, name: 'سيناء' }
    ];
    res.json(governorates);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. API أماكن الخروجات
app.get('/api/places', (req, res) => {
  try {
    const { governateId, categoryId } = req.query;

    const dummyPlaces = [
      {
        id: 101,
        name: 'أهرامات الجيزة',
        governateId: 1,
        categoryId: 'historical',
        ticketPrice: '60 جنيه',
        phone: '0233771111',
        address: 'الهرم، الجيزة',
        mapUrl: 'https://maps.google.com'
      },
      {
        id: 102,
        name: 'برج القاهرة',
        governateId: 1,
        categoryId: 'entertainment',
        ticketPrice: '70 جنيه',
        phone: '0227365112',
        address: 'الزمالك، القاهرة',
        mapUrl: 'https://maps.google.com'
      },
      {
        id: 201,
        name: 'وادي الريان',
        governateId: 2,
        categoryId: 'entertainment',
        ticketPrice: '50 جنيه',
        phone: '0842090000',
        address: 'محمية وادي الريان، الفيوم',
        mapUrl: 'https://maps.google.com'
      },
      {
        id: 301,
        name: 'قلعة قايتباي',
        governateId: 3,
        categoryId: 'historical',
        ticketPrice: '60 جنيه',
        phone: '034865100',
        address: 'الأنفوشي، الإسكندرية',
        mapUrl: 'https://maps.google.com'
      }
    ];

    let filtered = dummyPlaces;

    if (governateId) {
      filtered = filtered.filter(p => String(p.governateId) === String(governateId));
    }

    if (categoryId && categoryId !== 'all') {
      filtered = filtered.filter(p => String(p.categoryId) === String(categoryId));
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// توجيه أي مسار آخر لصفحة index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
