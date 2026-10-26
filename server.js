const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware لتمرير البيانات والملفات الثابتة
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// تقديم صفحة index.html عند طلب الرابط الرئيسي
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
