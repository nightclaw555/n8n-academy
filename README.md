# n8n Automation Academy - Landing Page

เว็บไซต์หน้าเดียว (Landing Page) ระดับพรีเมียมสำหรับธุรกิจอบรมการทำระบบอัตโนมัติ (Automation) ด้วย n8n เจาะกลุ่ม TikTok Ads, TikTok Shop Affiliate, การตัดต่อวิดีโอด้วย AI และระบบ LINE RAG Chatbot

- **โดเมนที่เชื่อมต่อ:** [ayaigaldie.online](http://ayaigaldie.online)
- **เทคโนโลยีที่ใช้:** HTML5, Vanilla CSS, Vanilla JavaScript, Google Fonts

## โครงสร้างโปรเจกต์
- `index.html`: โครงสร้างหน้าเว็บหลักและข้อมูลหลักสูตร
- `style.css`: ไฟล์สไตล์สีสัน Dark Theme เรืองแสงแยกตามหลักสูตร และตัวจำลองโทรศัพท์มือถือ (TikTok Ads Showcase)
- `script.js`: ฟังก์ชันสไลด์ภาพและเอฟเฟกต์การโต้ตอบหน้าเว็บ
- `line_qr.jpg`: รูปภาพสแกน LINE QR Code ของจริงสำหรับให้ลูกค้าติดต่อสอบถาม
- `n8n_workflow_demo.png`: ภาพจำลองการรันระบบ n8n
- `tiktok_ad_*.png` & `wf_*.png`: ภาพจำลองหน้าโฆษณา TikTok และโครงสร้างของ Node เวิร์กโฟลว์

## ขั้นตอนการติดตั้งและอัปโหลดขึ้น GitHub Pages

### 1. เชื่อมต่อ Git Remote
เปิด Terminal ในโฟลเดอร์นี้และรันคำสั่ง:
```bash
git remote add origin https://github.com/YOUR_USERNAME/n8n-training-website.git
git branch -M main
git push -u origin main
```

### 2. ตั้งค่าบน GitHub เพื่อเปิดเว็บไซต์
1. เข้าไปที่คลังเก็บโค้ดนี้บนหน้าเว็บไซต์ GitHub
2. ไปที่แท็บ **Settings** -> เมนูด้านซ้ายเลือก **Pages**
3. หัวข้อ **Build and deployment** -> เลือก Branch เป็น `main` และกด **Save**
4. ในช่อง **Custom domain** ให้ระบุชื่อโดเมน `ayaigaldie.online` และกด **Save**
5. รอระบบออกใบรับรอง SSL และเลือกติ๊กถูกที่ช่อง **Enforce HTTPS**

### 3. ตั้งค่า DNS ที่ผู้ให้บริการโดเมนของคุณ
ให้เพิ่มประเภทยิงข้อมูลดังนี้เพื่อให้โดเมนชี้มายังหน้าเว็บ GitHub Pages:
- **CNAME Record:** Host: `www` | Value: `YOUR_USERNAME.github.io`
- **A Records:** Host: `@` | Values:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
