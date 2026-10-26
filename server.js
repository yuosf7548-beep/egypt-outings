const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 1. مسار المحافظات
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

// 2. مسار الأماكن الخروجات
app.get('/api/places', (req, res) => {
  const { governateId, categoryId } = req.query;

  // بيانات استرشادية لكل محافظة
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
    filtered = filtered.filter(p => p.governateId == governateId);
  }

  if (categoryId && categoryId !== 'all') {
    filtered = filtered.filter(p => p.categoryId == categoryId);
  }

  res.json(filtered);
});

// الصفحة الرئيسية
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
