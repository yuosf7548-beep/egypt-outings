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

// 2. API الأماكن بالخصائص الشاملة
app.get('/api/places', (req, res) => {
  const { governateId, categoryId } = req.query;

  const places = [
    {
      id: 101,
      name: 'أهرامات الجيزة',
      title: 'أهرامات الجيزة',
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

  let result = places;

  if (governateId) {
    result = result.filter(p => String(p.governateId) === String(governateId));
  }

  if (categoryId && categoryId !== 'all') {
    result = result.filter(p => String(p.categoryId) === String(categoryId));
  }

  res.json(result);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
