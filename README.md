# Safwan Piliang - Web Portfolio (V2)

Project portofolio personal berbasis **Next.js** yang telah di-deploy secara live di VPS Hostinger dengan domain **[https://safwan.id](https://safwan.id)**.

---

## 🚀 1. Jalankan di Lokal (Development)

Untuk menjalankan project di laptop/lokal (Mac):

```bash
npm install
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📤 2. Cara Update Kode (Push dari IDE / Mac ke Git)

Setiap kali kamu selesai mengedit kode di IDE (VS Code / Cursor / dsb), jalankan perintah ini di Terminal Mac:

```bash
# 1. Masuk ke folder project (jika belum)
cd "/Users/mymac/Documents/CODE PROJECTS/WEB PORTO/Safwan Web Porto V2/portfolio_light_new"

# 2. Tambahkan semua perubahan
git add .

# 3. Buat commit pesan perubahan
git commit -m "IOS Bug Fix"

# 4. Push ke GitHub (Repo: Safwan-Web-Portofolio-V2)
git push
```

---

## 🌐 3. Cara Deploy Perubahan ke VPS (`safwan.id`)

Setelah sukses melakukan `git push` di Mac, ikuti langkah berikut untuk memperbarui tampilan di server VPS:

### Step 3.1: Login SSH ke VPS
Buka Terminal Mac baru, lalu jalankan:
```bash
ssh root@31.97.107.110
```

### Step 3.2: Tarik Kode & Build Ulang di VPS
Salin dan jalankan perintah ini sekaligus di VPS:
```bash
cd /var/www/portfolio
git pull
npm install
npm run build
pm2 restart safwan-porto-v2
```

---

## 🛠️ 4. Perintah Perawatan & Troubleshooting VPS

* **Cek status proses web (PM2):**
  ```bash
  pm2 status
  ```
* **Lihat log / error jika website mengalami masalah:**
  ```bash
  pm2 logs safwan-porto-v2 --lines 50
  ```
* **Restart server Nginx:**
  ```bash
  sudo systemctl restart nginx
  ```
* **Clear Port jika 3000 tersangkut (`EADDRINUSE`):**
  ```bash
  pm2 stop safwan-porto-v2
  sudo fuser -k 3000/tcp
  pm2 start safwan-porto-v2
  ```
