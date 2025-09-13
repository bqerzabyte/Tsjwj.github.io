const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// ملف حفظ التوكنات
const tokensFile = path.join(__dirname, 'tokens.txt');

app.post('/save-token', (req, res) => {
  const token = req.body.token;

  if (!token) {
    console.log('لم يتم إرسال توكن.');
    return res.status(400).json({ status: 'error', message: 'No token received' });
  }

  try {
    // حفظ التوكن في الملف
    fs.appendFileSync(tokensFile, token + '\n', { encoding: 'utf8' });
    console.log('تم حفظ التوكن بنجاح:', token);

    // الرد على index.html لإكمال عملية الإشعارات
    res.json({ status: 'success', message: 'تم تفعيل الإشعارات بنجاح!' });
  } catch (err) {
    console.error('خطأ عند حفظ التوكن:', err);
    res.status(500).json({ status: 'error', message: 'Failed to save token' });
  }
});

// تشغيل السيرفر على port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
