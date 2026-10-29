# Rencana Redesign safwan.id (V3)

Disusun 29 Okt 2026. Dasar: safwan.id (live, desktop dan mobile 375px), 5 situs referensi, dan vault Obsidian.

> **Keputusan (29 Okt):** konsep Canvas, tagline lama tetap, light saja, 7 studi kasus. Konten fase 0: [phase-0-content.md](phase-0-content.md).

## 1. Perbandingan

| | safwan.id | Ghani | Azril | Christen | Strike | A24 (Ravi) |
|---|---|---|---|---|---|---|
| Konsep besar | Kurang jelas (gradasi biru, robot 3D, ID card SpongeBob) | Terminal developer | Visualisasi ML (loss curve, embedding 3D) | Sinematik, dot-matrix, hitam-putih | Stiker, name tag, piringan hitam | Objek (disc) yang diputar saat scroll |
| Konsep = profesi? | Belum | Ya | Ya | Ya | Ya | Ya |
| Loader | 2 dtk, teks acak | `./boot --portfolio` | Training model sampai converged | — | — | Hitungan angka |
| Pengalaman/timeline | **Tidak ada** | `tail -f work.log`, graf per bulan | Checkpoint per magang | Peta perjalanan | Tracklist vinyl | — |
| Angka/bukti | Tidak ada | 222 kontribusi | 13 model, 22 proyek | — | 18 thn, 14 MVP | Rating review |
| Detail proyek | Link keluar ke Behance | Panel detail + "Read case study" | Inspector per titik | Halaman proyek | — | Panel per film |
| Kontak | Tombol "Let's talk" | CTA + terminal | CV + kontak | Asisten AI | Email + WhatsApp menonjol | — |
| Status/ketersediaan | — | "Available for Opportunities" | — | Jam lokal, "open to collaborations" | — | — |

### Pelajaran utama
1. **Semua referensi punya satu metafora yang diambil dari profesinya.** Ghani bicara lewat terminal, Azril lewat model ML. safwan.id belum punya metafora; padahal fake multiplayer cursor yang sudah ada itu sangat "Figma".
2. **Pengalaman tidak ditampilkan.** Kamu punya 15+ peran bertanggal (lihat vault), tapi situs hanya punya grid proyek. Ini kekurangan terbesar untuk rekruter magang.
3. **Proyek tidak punya cerita di dalam situs.** Semua kartu ke Behance/Instagram. Studi kasus kuat (PIONIR, Porsenigama, SkyBase, SiBudaya, SiMagang) belum tampil sebagai halaman sendiri.
4. **Tidak ada angka.** Referensi memberi bukti cepat (jumlah proyek, organisasi, tahun).
5. Catatan: Ghani juga mengerjakan SiBudaya, SkyBase, dan Tech Enthusiast Day. Studi kasusmu bisa saling melengkapi dengannya (sisi UI/UX vs backend) dan saling menautkan.

### Yang tidak perlu ditiru
- Scroll-jacking berat (A24) dan WebGL penuh layar (Christen, Azril): mahal di HP kelas menengah dan Safari iOS.
- Kepadatan teks gaya terminal: cocok untuk engineer, kurang cocok untuk desainer visual.

## 2. Konsep yang direkomendasikan: "Canvas" (gaya Figma)

Situs terasa seperti file desain yang sedang dikerjakan. Ini setara terminal milik Ghani, tetapi untuk desainer UI/UX.

- **Loader:** "Opening Safwan-Portfolio.fig" dengan progress bar, tetap ±2 dtk (keputusan lama).
- **Hero:** kanvas bergrid titik; nama dan tagline sebagai layer teks yang punya selection box dan handle; cursor multiplayer (yang sudah ada) "mengedit" hero. Robot 3D tetap sebagai satu "frame".
- **Navbar:** toolbar Figma kecil (Move, Frame, Text) yang sebenarnya link ke seksi.
- **Proyek:** setiap proyek = frame berlabel (`Frame / PIONIR 2025`). Klik membuka halaman studi kasus.
- **Pengalaman:** "Version history" (daftar versi bertanggal, terbaru di atas), difilter UI/UX · Visual & 3D · Kepemimpinan.
- **About:** panel "Inspect" di kanan (Role, Based, Tools, Status) bersama ID card yang sudah ada.
- **Angka:** baris kecil, misalnya "20 proyek · 15 peran · 2 studi kasus · sejak 2024". Angkanya diambil dari vault, bukan dikarang.
- **Kontak:** "Comment" bergaya Figma: "Open for internship from Dec 2026 →" plus email, LinkedIn, CV.

Alternatif kalau ingin lebih berani: **"3D Object Shelf"** (gaya A24): maskot 3D (RDK, Pionir Permadani, Habi) berputar saat scroll. Lebih berat dibuat dan dioptimasi; cocok sebagai satu seksi, bukan konsep utama.

## 3. Struktur halaman baru

```
/                 Hero → Logo klien → Featured work (4–6) → All work (grid+filter)
                  → Version history (pengalaman) → Articles → About/Inspect → Contact
/work/[slug]      Studi kasus: ringkasan, peran, tim, tantangan, proses, hasil, galeri, link Behance/Medium
```

- `/work/[slug]` dibuat statis dari `src/data/projects.ts` (tambah field opsional `caseStudy`). Proyek tanpa studi kasus tetap ke Behance.
- Data pengalaman baru di `src/data/experience.ts`, isinya dari note `Pengalaman` di vault.

## 4. Tahapan kerja

| Fase | Isi | Hasil |
|---|---|---|
| 0. Keputusan & konten | Pilih konsep, pilih 4–6 proyek unggulan, jawab tanggal yang bentrok (CV vs LinkedIn) | Daftar konten final |
| 1. Fondasi | Token warna/tipografi baru, grid kanvas, navbar toolbar, versi mobile navbar | Kerangka tampilan |
| 2. Hero + loader | Hero kanvas, selection box, cursor, loader `.fig` | Kesan pertama baru |
| 3. Proyek | Featured + grid, halaman `/work/[slug]`, metadata OG per proyek | Studi kasus di dalam situs |
| 4. Pengalaman & angka | Version history + baris angka | Bukti untuk rekruter |
| 5. About & kontak | Panel Inspect, status magang, CTA kontak | Ajakan yang jelas |
| 6. Motion | Cari peluang animasi, bangun, cek performa | Situs terasa hidup |
| 7. QA lintas device | Matriks di bagian 5 | Siap rilis |

Setiap fase: branch fitur sendiri, commit lokal, **kamu yang `git push`**. Preview Vercel per branch dipakai untuk cek di HP asli.

## 5. Kompatibilitas semua device

**Prinsip:** konten dan navigasi jalan di semua device; efek adalah bonus.

- **Breakpoint:** 360 · 390/430 (HP) · 768 (tablet) · 1024 (tablet landscape/laptop kecil) · 1440+.
- **Hover vs sentuh:** efek hover (tilt, cursor, selection box) hanya di `@media (hover: hover) and (pointer: fine)`. Di HP diganti tap atau tampil statis.
- **Cursor multiplayer:** desktop saja (sudah ada di FakeCursor; dipertahankan).
- **Motion:** semua animasi menghormati `prefers-reduced-motion`; framer-motion pakai `MotionConfig reducedMotion="user"`.
- **3D/WebGL** (kalau dipakai): dimuat lazy saat seksi terlihat, poster gambar sebagai fallback, dimatikan di perangkat lemah atau reduced-motion.
- **Tinggi layar:** pakai `svh`/`dvh`, bukan `100vh` (bug bilah alamat iOS).
- **Safe area:** `env(safe-area-inset-*)` untuk navbar bawah/atas di iPhone berponi.
- **Target sentuh:** minimal 44×44 px (chip filter dan ikon Behance sekarang kecil).
- **Teks:** ukuran cair dengan `clamp()`; input ≥16px agar iOS tidak zoom.
- **Tanpa scroll-jacking:** scroll asli; efek scroll pakai CSS scroll-driven animation dengan fallback statis (Safari lama).
- **Pertahankan keputusan lama:** parallax hanya CSS dan desktop, kartu tanpa `preserve-3d`, `<main>` `overflow: clip`, `next/image`.
- **Anggaran performa (HP, 4G):** LCP < 2,5 dtk, CLS < 0,1, INP < 200 ms, JS awal tetap kecil.
- **Matriks uji:** iPhone Safari (asli), Android Chrome (asli/emulasi), iPad Safari portrait & landscape, Mac Safari, Chrome, Firefox desktop. Cek juga keyboard (Tab) dan zoom 200%.

## 6. Temuan kecil di situs sekarang (bisa diperbaiki kapan saja)
- Typo "Hi, Im" → "Hi, I'm"; "Selected Project's" → "Selected Projects".
- Di mobile, hero 2 detik pertama hanya teks acak di layar kosong.
- Kartu proyek di desktop muncul pelan (reveal) sehingga grid sempat terlihat kosong.
- Tidak ada bagian kontak selain tombol di navbar.

## 7. Pertanyaan sebelum mulai
1. Konsep: Canvas (rekomendasi), 3D Object Shelf, atau gabungan?
2. Tetap terang (light) atau tambah mode gelap?
3. Proyek mana yang jadi studi kasus di dalam situs, dan apakah gambar proses (wireframe, Figma) boleh dipakai?
4. Tagline: tetap "Crafting Digital Experience..." atau "Design isn't decoration. It's decision."?
