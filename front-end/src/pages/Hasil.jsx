import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import "../styles/Hasil.css";

// ROUTER
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

// ICON
import { RotateCcw } from "lucide-react";

function Hasil() {
  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.result;

  const aiCategory =
    location.state?.result?.category?.toLowerCase() || "organik";

  const normalizeCategory = (cat) => {
    if (!cat) return "residu";

    cat = cat.toLowerCase();

    if (cat.includes("organic")) return "organik";
    if (cat.includes("anorganic") || cat.includes("inorganic") || cat.includes("anorganik")) {
      return "anorganik";
    }
    if (cat === "hazard" || cat === "b3") return "b3";
    if (cat === "recyclable") return "recyclable";

    return cat;
  };

  const cssCategory = normalizeCategory(aiCategory)?.trim().toLowerCase();
  

  const categoryMapping = {
    organic: "Organik",
    plastik: "Anorganik",
    kaca: "Anorganik",
    logam: "Anorganik",
    kardus: "Anorganik",
    kertas: "Anorganik",
    recyclable: "Recyclable",
    residu: "Residu",
    hazard: "B3"
  };

  const frontendCategory =
    categoryMapping[aiCategory] ||
    categoryMapping[cssCategory] ||
    aiCategory;

  // DATA DARI HALAMAN SEBELUMNYA
  const [hasilDariAI, setHasilDariAI] =
    useState(aiCategory);

  useEffect(() => {
    if (location.state?.result?.category) {
      const aiResult =
        location.state.result.category.toLowerCase();

      setHasilDariAI(aiResult);
    }
  }, [location.state]);

  const imageDariAI =
    location.state?.imagePreview ||
    "https://via.placeholder.com/250";

  const [feedback, setFeedback] =
    useState(null);

  const [feedbackText, setFeedbackText] =
    useState("");

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [showNotif, setShowNotif] =
    useState(false);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  // DATA KATEGORI
  const kategoriData = {
    organik: {
      title: "Kategori Organik",
      description:
        "Sampah organik merupakan sampah yang berasal dari makhluk hidup seperti sisa makanan, daun, ranting, dan bahan alami lainnya yang mudah terurai secara alami oleh mikroorganisme."
    },

    anorganik: {
      title: "Kategori Anorganik",
      description:
        "Sampah anorganik merupakan sampah yang sulit terurai secara alami dan umumnya berasal dari bahan non-hayati seperti plastik, kaca, logam, kertas, dan kardus. Jenis sampah ini dapat dikelola melalui proses daur ulang."
    },

    residu: {
      title: "Kategori Residu",
      description:
        "Sampah residu adalah sampah yang tidak dapat didaur ulang atau diolah kembali sehingga memerlukan penanganan khusus sebelum dibuang ke tempat pembuangan akhir."
    },

    b3: {
      title: "Kategori B3",
      description:
        "Sampah B3 (Bahan Berbahaya dan Beracun) merupakan limbah yang dapat membahayakan kesehatan manusia maupun lingkungan sehingga memerlukan penanganan khusus."
    },

    recyclable: {
      title: "Kategori Daur ulang",
      description:
        "Sampah recyclable adalah jenis sampah yang masih dapat di daur ulang dan diolah kembali menjadi produk baru yang bermanfaat"
    }
  };

  // DATA HASIL
  const hasilData = {
    plastik: {
      kategori: "Plastik",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Plastik.",

      title:
        "Jenis Sampah Plastik (Contoh: Botol Air Minum, Kantong Belanja, Wadah Makanan, Cup Plastik)",

      description: `
Sampah plastik adalah jenis limbah anorganik makromolekul sintetik yang membutuhkan waktu puluhan hingga ratusan tahun untuk terurai secara alami. Sifatnya yang ringan, tahan lama, dan kedap air membuatnya sangat sering digunakan, namun penanganan yang salah dapat menyebabkannya pecah menjadi mikroplastik yang merusak rantai makanan.
`,

      image:
        "/plastik-1.png",

      image2:
        "/plastik-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah plastik yang benar dari rumah:",

      handling: [
        "Kosongkan dan Bilas: Pastikan tidak ada sisa makanan atau cairan di dalam botol atau wadah plastik. Sisa organik dapat menimbulkan bau dan mengkontaminasi material daur ulang lainnya.",

        "Remas atau Pipihkan: Tekan atau injak botol plastik hingga kempis untuk mengurangi volume ruang penyimpanan di wadah penampungan rumah tangga maupun saat pengangkutan.",

        "Lepaskan Label dan Tutup Botol: Pisahkan tutup botol, ring segel, dan label plastik jika jenis materialnya berbeda, karena proses peleburan pabrik sering memerlukan pemisahan jenis polimer seperti PET dan HDPE."
      ],

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus plastik apa yang dilakukan?",

      publicGuide: [
        "Bawa Pulang atau Simpan: Bersihkan sisa cairan di dalam botol atau cup, remas hingga pipih agar hemat tempat, lalu simpan di tas Anda untuk dibuang di rumah atau disalurkan ke Bank Sampah terdekat."
      ],

      benefitsTitle:
        "Tujuan utama dari pengolahan sampah plastik yang baik adalah:",

      benefits: [
        "Mencegah Pembentukan Mikroplastik: Menghentikan plastik terfragmentasi di alam liar yang dapat mencemari air tanah, laut, serta masuk ke dalam organ tubuh makhluk hidup.",

        "Mengurangi Penggunaan Minyak Bumi: Menghemat bahan baku fosil karena plastik daur ulang dapat digunakan kembali untuk membuat serat pakaian poliester, perabot, atau kemasan baru."
      ]
    },

    kardus: {
      kategori: "Kardus",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Kardus.",

      title:
        "Jenis Sampah Kardus (Contoh: Kotak Paket/Ekspedisi, Kotak Sepatu, Dus Susu/Sereal)",

      description: `
Sampah kardus adalah kemasan kertas tebal bergelombang (corrugated cardboard) yang memiliki serat kayu kuat dan nilai daur ulang yang sangat tinggi. Kardus sangat mudah diproses kembali menjadi bubur kertas (pulp) untuk dijadikan kemasan baru, asalkan tidak terkontaminasi oleh minyak atau zat kimia.
`,

      image:
        "/kardus-1.png",

      image2:
        "/kardus-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah kardus yang benar dari rumah:",

      handling: [
        "Lepaskan Selotip dan Lakban: Kelupas semua sisa selotip plastik, lakban, stiker resi pengiriman, atau staples besi yang menempel pada kardus karena material non-kertas ini dapat merusak mesin bubur kertas.",

        "Bongkar dan Lipat Rata (Flatten): Buka semua lipatan kotak kardus hingga menjadi lembaran datar sempurna. Hal ini sangat krusial untuk menghemat ruang penyimpanan dan mempermudah pengikatan.",

        "Jaga Tetap Kering: Simpan kardus di tempat yang terlindung dari air hujan dan kelembapan, karena kardus yang basah akan menurunkan kualitas serat selulosa secara drastis dan memicu pertumbuhan jamur."
      ],

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus kardus apa yang dilakukan?",

      publicGuide: [
        "Lipat Datar dan Amankan: Lipat kardus menjadi ukuran terkecil, ikat rapi, lalu bawa pulang atau titipkan ke tempat penampungan logistik atau kurir terdekat yang biasanya memiliki jalur pengelolaan limbah kardus mandiri."
      ],

      benefitsTitle:
        "Tujuan utama dari pengolahan sampah kardus yang baik adalah:",

      benefits: [
        "Menghemat Ruang TPA secara Signifikan: Kardus berbentuk kotak utuh memakan ruang yang sangat besar di truk sampah dan TPA. Melipat dan mendaur ulangnya memaksimalkan efisiensi kapasitas lahan.",

        "Menekan Laju Penebangan Pohon: Setiap ton kardus yang didaur ulang mampu menyelamatkan belasan pohon dewasa yang menjadi bahan baku utama pembuatan kertas baru."
      ]
    },

    kertas: {
      kategori: "Kertas",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Kertas.",

      title:
        "Jenis Sampah Kertas (Contoh: Koran Bekas, Majalah, Dokumen HVS, Buku Tulis, Brosur)",

      description: `
Sampah kertas adalah sisa lembaran organik berbahan dasar serat kayu yang sangat ramah lingkungan untuk didaur ulang. Kertas merupakan salah satu komoditas daur ulang paling aktif, namun seratnya akan memendek setiap kali diproses ulang, sehingga memerlukan penanganan yang bersih agar kualitasnya tetap terjaga.
`,

      image:
        "/kertas-1.png",

      image2:
        "/kertas-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah kertas yang benar dari rumah:",

      handling: [
        "Pisahkan Berdasarkan Jenisnya: Kelompokkan kertas putih (HVS/buku), kertas koran, dan kertas berwarna atau majalah mengkilap, karena tiap jenis memiliki nilai jual dan proses peleburan yang berbeda.",

        "Singkirkan Komponen Non-Kertas: Lepaskan klip kertas (paperclip), staples, jilid spiral plastik, atau lapisan mika pelindung dokumen sebelum dikumpulkan.",

        "Hindari Kontaminasi Minyak: Jangan mencampur kertas bersih dengan kertas yang terkena minyak seperti kertas bungkus makanan, gorengan, atau kotak pizza karena minyak tidak bisa dipisahkan dari serat kertas saat proses daur ulang."
      ],

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus kertas apa yang dilakukan?",

      publicGuide: [
        "Simpan di Tempat Kering: Masukkan kertas ke dalam kompartemen tas yang kering agar tidak basah oleh keringat atau air minum, lalu kumpulkan di rumah bersama persediaan kertas daur ulang lainnya."
      ],

      benefitsTitle:
        "Tujuan utama dari pengolahan sampah kertas yang baik adalah:",

      benefits: [
        "Menghemat Energi dan Air: Proses pembuatan kertas dari bahan daur ulang membutuhkan air dan energi yang jauh lebih sedikit dibandingkan memproduksi kertas dari bahan baku pohon baru.",

        "Mengurangi Emisi Gas Rumah Kaca: Kertas yang dibuang begitu saja di TPA akan membusuk secara anaerobik dan menghasilkan gas metana. Mendaur ulangnya membantu mengurangi emisi tersebut."
      ]
    },

    kaca: {
      kategori: "Kaca",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Kaca.",

      title:
        "Jenis Sampah Kaca (Contoh: Botol Sirup, Toples Selai, Botol Parfum, Gelas Kaca)",

      description: `
Sampah kaca adalah limbah anorganik padat yang unik karena dapat didaur ulang secara terus-menerus (100% recyclable) tanpa mengalami penurunan kualitas atau kemurnian material. Kaca terbuat dari pasir silika yang dilebur pada suhu sangat tinggi, sehingga mengumpulkan dan melebur kembali kaca lama jauh lebih efisien secara energi.
`,

      image:
        "/kaca-1.png",

      image2:
        "/kaca-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah kaca yang benar dari rumah:",

      handling: [
        "Kosongkan dan Bilas Total: Cuci bersih bagian dalam botol atau toples kaca dari sisa sirup, selai, atau minyak. Keringkan sebelum disimpan.",

        "Pisahkan Tutup Botol: Lepaskan tutup botol yang biasanya terbuat dari logam (seng) atau plastik, karena material tersebut masuk ke lini daur ulang yang berbeda.",

        "Amankan dari Risiko Pecah: Simpan dalam wadah kokoh seperti krat atau kotak kayu atau kardus tebal. Jika ada kaca yang sudah pecah, bungkus pecahan tersebut dengan koran tebal lalu beri label 'Pecahan Kaca' demi keselamatan petugas kebersihan."
      ],

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus kaca apa yang dilakukan?",

      publicGuide: [
        "Bawa Pulang dengan Hati-Hati: Bungkus botol atau kemasan kaca agar tidak saling berbenturan di dalam tas, lalu bawa pulang untuk dikumpulkan dan disalurkan ke Bank Sampah atau pengrajin lokal."
      ],

      benefitsTitle:
        "Tujuan utama dari pengolahan sampah kaca yang baik adalah:",

      benefits: [
        "Efisiensi Energi Peleburan: Melebur kaca bekas (cullet) membutuhkan suhu yang jauh lebih rendah dibandingkan melebur bahan mentah pasir silika, sehingga menghemat konsumsi bahan bakar pabrik.",

        "Mencegah Cedera dan Kecelakaan Kerja: Penanganan dan pemisahan kaca yang terstruktur melindungi pemulung dan petugas kebersihan dari luka robek akibat pecahan kaca yang tercampur dalam sampah biasa."
      ]
    },

    logam: {
      kategori: "Logam",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Logam.",

      title:
        "Jenis Sampah Logam (Contoh: Kaleng Minuman Aluminium, Kaleng Susu Seng, Sendok Rusak, Panci Bekas)",

      description: `
Sampah logam, terutama aluminium dan besi/baja, adalah salah satu material daur ulang yang paling berharga secara ekonomi. Logam memiliki ketahanan struktur yang sangat tinggi dan dapat dilebur berulang kali menjadi produk baru tanpa kehilangan kekuatan mekanisnya.
`,

      image:
        "/logam-1.png",

      image2:
        "/logam-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah logam yang benar dari rumah:",

      handling: [
        "Bersihkan Sisa Isi Kemasan: Bilas bagian dalam kaleng makanan atau minuman hingga bersih untuk mencegah lalat, semut, dan bau tidak sedap selama masa penyimpanan.",

        "Pipihkan (Khusus Kaleng Aluminium): Tekan atau injak kaleng minuman hingga pipih untuk memaksimalkan kapasitas ruang penyimpanan.",

        "Tekuk Tutup Kaleng ke Dalam: Untuk kaleng makanan yang dibuka dengan alat pembuka tajam, tekuk lidah tutup kaleng yang tajam ke arah dalam agar tidak melukai tangan saat proses pemilahan."
      ],

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus logam apa yang dilakukan?",

      publicGuide: [
        "Simpan dan Bawa Pulang: Karena ukurannya yang relatif ringkas, bilas kaleng tersebut, keringkan dengan tisu, lalu masukkan ke kantong barang untuk dibawa pulang menuju tempat pemilahan utama."
      ],

      benefitsTitle:
        "Tujuan utama dari pengolahan sampah logam yang baik adalah:",

      benefits: [
        "Penghematan Sumber Daya Tambang: Mendaur ulang aluminium menghemat hingga 95% energi yang dibutuhkan untuk menambang dan memproses bijih bauksit mentah dari alam.",

        "Menghilangkan Tempat Bersarangnya Nyamuk: Kaleng logam yang terbuang sembarangan di lahan terbuka dapat menampung air hujan dan menjadi sarang utama berkembang biaknya nyamuk penular demam berdarah (Aedes aegypti)."
      ]
    },

    organik: {
      kategori: "Organik",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Organik.",

      title:
        "Jenis Sampah Organik (Contoh: Sisa Makanan, Daun Kering, Teh Celup)",

      description: `
Sampah Organik adalah material sisa yang berasal dari makhluk hidup (hewan dan tumbuhan) yang bersifat hayati dan mudah membusuk. Berbeda dengan residu, B3, atau recyclable, jenis sampah ini dapat diurai kembali oleh alam (biodegradabel) secara cepat melalui proses dekomposisi alami oleh mikroorganisme menjadi unsur hara tanah.
`,
      image:
        "/organik-1.png",
      image2:
        "/organik-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah organik yang benar di lingkup rumah tangga:",

      handling: [
        "Bagi sampah organik menjadi dua jenis Organik hijau (Basah/Kaya Nitrogen) dan Organik coklat (Kering/Kaya Karbon) untuk mempermudah pengolahan.",

        "Potong atau cacah sisa sayuran, kulit buah, atau daun kering menjadi ukuran sekitar 2–5 cm. Semakin kecil ukurannya, semakin cepat mikroorganisme mengurainya menjadi kompos.",

        "Pilih salah satu metode pengolahan seperti membuat kompos dengan mencampurkan sampah organik hijau dan coklat, kemudian ditambahkan sedikit tanah atau cairan EM4 (Starter Bakteri), atau metode Lubang Biopori dengan membuat lubang silindris vertikal ke dalam tanah di halaman rumah, kemudian masukkan sampah organik secara berkala ke dalamnya untuk menyuburkan tanah dan meningkatkan daya resap air hujan."
      ],

      publicGuideTitle:
        "Jika Anda berada di ruang publik dan tidak menemukan tempat sampah khusus organik, lakukan langkah berikut:",

      publicGuide: [
        "Bawa Pulang dalam Wadah Tertutup: Masukkan sisa makanan ke dalam kotak makan kosong atau kantong ramah lingkungan agar bau dan cairannya tidak bocor di dalam tas.",

        "Kubur di Tanah (Jika Memungkinkan): Jika Anda sedang berkemah atau berada di alam terbuka, sampah organik non-olahan (seperti kulit buah) bisa dikubur langsung di dalam tanah untuk menjadi pupuk alami.",

        "Kelola di Rumah: Setibanya di rumah, masukkan sampah organik ini ke dalam wadah komposter atau biopori keluarga."
      ],

      benefitsTitle:
        "Memisahkan dan mengolah sampah organik dengan benar memiliki dampak paling krusial terhadap keberlanjutan lingkungan, yaitu:",

      benefits: [
        "Mencegah Ledakan Gas Metana di TPA: Sampah organik yang tertumpuk dan tertimbun bersama plastik di TPA akan membusuk tanpa oksigen, menghasilkan gas metana yang berpotensi memicu ledakan dan kebakaran TPA, serta menjadi gas rumah kaca yang 25 kali lebih merusak daripada CO2.",

        "Menghilangkan Air Lindi (Cairan Sampah): Sampah organik adalah pemicu utama munculnya cairan hitam berbau busuk (air lindi) di truk sampah dan TPA yang dapat mencemari sumur air warga sekitar.",

        "Menghasilkan Pupuk Alami (Kompos): Mengubah limbah menjadi pupuk organik kaya nutrisi yang dapat menyuburkan tanah, memperbaiki struktur lahan pertanian, dan mengurangi ketergantungan pada pupuk kimia.",

        "Sumber Pakan Alternatif (Maggot BSF): Sampah organik kering/basah dapat diolah menjadi pakan larva Black Soldier Fly (Maggot BSF), yang nantinya menjadi pakan ternak tinggi protein dan bernilai ekonomi tinggi."
      ],
    },

    anorganik: {
      kategori: "Anorganik",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Anorganik.",

      title:
        "Sampah Anorganik",

      description: `
        Sampah anorganik merupakan jenis sampah yang sulit terurai seperti plastik, kaca, logam, dan kaleng.

        Sampah jenis ini membutuhkan proses daur ulang khusus agar tidak mencemari lingkungan dan dapat dimanfaatkan kembali menjadi produk baru.
      `,

      image:
        "/images/anorganik.jpg",

      note:
        "Catatan: Sampah anorganik sebaiknya dipilah untuk proses daur ulang agar tidak mencemari lingkungan.",

      points: [
        "Sulit terurai secara alami",
        "Dapat mencemari tanah dan laut",
        "Bisa didaur ulang",
        "Perlu pemilahan khusus"
      ]
    },

    b3: {
      kategori: "B3",

      result:
        "Foto yang kamu kirim termasuk kategori sampah B3 (Bahan Berbahaya dan Beracun).",

      title:
        "Jenis Sampah B3 / Hazard (Contoh: Baterai Bekas, Lampu Neon, Botol Aerosol)",

      description: `
Sampah Hazard atau B3 (Bahan Berbahaya dan Beracun) adalah sisa limbah dari aktivitas manusia maupun industri yang mengandung zat, energi, atau komponen berbahaya yang dapat mencemari lingkungan, merusak ekosistem, serta membahayakan kesehatan manusia secara langsung maupun tidak langsung.

Limbah ini dicirikan oleh sifatnya yang mudah meledak, mudah terbakar, reaktif, beracun, menyebarkan infeksi, atau bersifat korosif sehingga memerlukan penanganan khusus.
`,

      image:
        "/B3-1.png",

      image2:
        "/B3-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah B3 yang aman dari rumah:",

      handling: [
        "Lakukan pemilahan dan pemisahan limbah seperti baterai bekas, lampu neon, atau botol aerosol ke dalam kotak kardus atau wadah plastik tebal yang kering dan jauh dari jangkauan anak-anak.",

        "Kumpulkan terlebih dahulu hingga jumlah tertentu agar lebih aman dan efisien dalam proses pengangkutan.",

        "Bawa ke fasilitas penjemputan sampah elektronik atau B3 terdekat, atau serahkan ke pos pengelolaan sampah lingkungan yang bekerja sama dengan Dinas Lingkungan Hidup."
      ],

      publicGuideTitle:
        "Jika tidak menemukan tempat sampah khusus B3 apa yang dilakukan?",

      publicGuide: [
        "Simpan sementara di wadah tertutup yang aman dan jangan dicampur dengan sampah rumah tangga biasa.",

        "Bawa pulang untuk disimpan hingga dapat disalurkan ke fasilitas pengelolaan limbah B3 resmi.",

        "Hindari membuang baterai, lampu neon, atau aerosol ke tempat sampah umum karena berpotensi mencemari lingkungan dan membahayakan petugas kebersihan."
      ],

      benefitsTitle:
        "Tujuan utama dari pengolahan sampah B3 yang baik adalah:",

      benefits: [
        "Menghindari kontaminasi logam berat berbahaya seperti merkuri, timbal, dan kadmium agar tidak meresap ke dalam tanah maupun sumber air masyarakat.",

        "Mencegah Ledakan dan Kebakaran karena limbah seperti baterai litium, aerosol, atau bahan kimia tertentu sangat mudah bereaksi terhadap panas dan tekanan.",

        "Melindungi petugas kebersihan, pemilah sampah, dan masyarakat dari risiko luka bakar kimia, iritasi pernapasan, keracunan, maupun cedera akibat pecahan material berbahaya."
      ]
    },

    recyclable: {
      kategori: "Recyclable",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Recyclable.",

      title:
        "Jenis Sampah Recyclable (Contoh: Botol Plastik, Kaleng, Kaca)",

      description: `
Sampah Recyclable adalah material sisa yang telah habis masa pakainya, namun masih memiliki nilai ekonomi karena dapat diproses kembali menjadi bahan baku baru. Berbeda dengan residu yang tidak dapat didaur ulang atau B3 yang memerlukan penanganan khusus, sampah recyclable dapat dilebur, dicacah, atau dirakit ulang menjadi produk yang berguna apabila dikelola dengan benar.
`,

      image:
        "/recyclable-1.png",

      image2:
        "/recyclable-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah daur ulang dari rumah hingga siap diolah:",

      handling: [
        "Jangan mencampur semua sampah daur ulang dalam satu wadah. Pisahkan menjadi empat kategori utama yaitu plastik, kertas, logam, dan kaca.",

        "Bersihkan atau cuci bagian dalam botol, kaleng, atau toples kaca yang bekas makanan maupun minuman agar tidak mengundang serangga dan bau.",

        "Keringkan sampah yang sudah dibilas hingga benar-benar kering untuk mencegah jamur dan kontaminasi material lainnya.",

        "Setelah terkumpul dalam kondisi bersih dan kering, salurkan melalui Bank Sampah, layanan penjemputan sampah daur ulang, petugas kebersihan, atau pengepul."
      ],

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus daur ulang apa yang dilakukan?",

      publicGuide: [
        "Bawa Pulang atau Simpan: Bersihkan sisa cairan di dalam botol atau kaleng, remas hingga pipih agar hemat tempat, lalu simpan sementara di dalam tas.",

        "Setor ke Bank Sampah: Kumpulkan di rumah hingga jumlahnya cukup banyak, kemudian jual atau serahkan ke Bank Sampah terdekat maupun pengepul lokal."
      ],

      benefitsTitle:
        "Manfaat utama dari pengolahan sampah recyclable adalah:",

      benefits: [
        "Mengurangi volume sampah yang berakhir di Tempat Pembuangan Akhir (TPA).",

        "Menghemat penggunaan sumber daya alam karena material lama dapat dimanfaatkan kembali menjadi produk baru.",

        "Mengurangi kebutuhan energi dalam proses produksi dibandingkan menggunakan bahan baku mentah dari alam.",

        "Meningkatkan nilai ekonomi melalui kegiatan daur ulang serta mendukung ekonomi sirkular yang berkelanjutan."
      ]
    },
    residu: {
      kategori: "Residu",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Residu.",

      title:
        "Jenis Sampah Residu (Contoh: Masker, Pembalut, Popok)",

      description: `
      Sampah yang tidak bisa didaur ulang karena kontaminasi biologis atau sifat materialnya yang kompleks sehingga tidak bisa didaur ulang, seperti tisu bekas, pembalut, popok sekali pakai, puntung rokok, dan styrofoam.
      `,

      image:
        "/residu-1.png",

      handlingTitle:
        "Sampah residu harus ditangani dengan penanganan khusus meliputi:",

      handling: [
        "Wajib dibungkus rapat dalam plastik/wadah tertutup sebelum dibuang ke tempat sampah.",
        "Khusus masker: Gunting tali dan bagian tengah masker untuk mencegah penyalahgunaan kembali oleh pihak tidak bertanggung jawab."
      ],

      facilityImage:
        "/residu-2.png",

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus residu apa yang dilakukan?",

      publicGuide: [
        "Bawa Kembali: Masukkan sampah ke dalam kantong plastik klip atau wadah tertutup di dalam tas Anda, lalu buang setibanya di rumah atau di tempat yang menyediakan fasilitas pilah sampah yang memadai."
      ],

      benefitsText:
        "Tujuan utama dari pengolahan sampah residu yang baik adalah mengurangi volume sampah yang berakhir di TPA (Tempat Pembuangan Akhir) dan mencegah pencemaran lingkungan. Dan mencegah penyebaran penyakit serta menjaga kebersihan lingkungan dari limbah medis rumah tangga."
    }
  };

  const data = hasilData[cssCategory];
  const kategoriInfo = kategoriData[cssCategory];

  // ===== CHECK FEEDBACK =====
  useEffect(() => {

    const savedFeedback =
      JSON.parse(
        localStorage.getItem("feedbacks")
      ) || [];

    const alreadyFeedback =
      savedFeedback.some(
        (item) =>
          item.image === imageDariAI
      );

    if (alreadyFeedback) {
      setIsSubmitted(true);
    }

  }, []);

  // ===== SUBMIT FEEDBACK =====
  const handleSubmitFeedback = async () => {

    if (!feedback) {
      alert("Pilih feedback terlebih dahulu");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/feedback",
        {
          feedback: feedbackText,
          rating: feedback,
          historyId: resultData?.id
        }
      );

      setShowNotif(true);

      setIsSubmitted(true);

      setTimeout(() => {
        setShowNotif(false);
      }, 2500);

    } catch (error) {

      console.error(
        "Gagal kirim feedback:",
        error
      );

    }

  };

  const handleRefreshResult = async () => {

    console.log(location.state);

    try {

      setIsRefreshing(true);

      const historyId =
        resultData?.id;

      console.log("ID HISTORY:", historyId);

      const imageResponse =
        await fetch(imageDariAI);

      const blob =
        await imageResponse.blob();

      const formData =
        new FormData();

      formData.append(
        "file",
        blob,
        "redetect.jpg"
      );

      formData.append(
        "session_id",
        resultData?.session_id
      );

      const response =
        await axios.post(
          "http://localhost:5001/predict_image",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const aiResult =
        response.data.category.toLowerCase();

      setHasilDariAI(aiResult);

      resultData.category =
        response.data.category;

      resultData.confidence =
        `${response.data.confidence}%`;

      await axios.put(
        `http://localhost:5000/history/${historyId}`,
        {
          category:
            response.data.category,

          confidence:
            `${response.data.confidence}%`
        }
      );

    } catch (error) {

      console.error(
        "Gagal refresh hasil:",
        error
      );

    } finally {

      setIsRefreshing(false);

    }
  };

  return (
    <div className="hasil-container">

      {/* HEADER */}
      <div className="hasil-header">

        <h1>EcoSortAI</h1>

      </div>

      {/* TITLE */}
      <div className="hasil-title-box">

        <h2>Hasil Klasifikasi AI</h2>

        <p>
          EcoSortAI berhasil menganalisis
          gambar sampah yang kamu upload
        </p>

      </div>

      {/* IMAGE */}
      <div className="hasil-image-section">

        <img
          src={imageDariAI}
          alt="hasil"
          className="hasil-img"
        />

      </div>

      {/* BADGE */}
      <div className="badge-group">

        <span className={`badge kategori ${cssCategory}`}>
          Kategori: {frontendCategory}
        </span>

        <span className={`badge jenis ${cssCategory}`}>
          Jenis: {resultData?.category}
        </span>

        <span className="badge akurasi">
          Akurasi: {resultData?.confidence}
        </span>

      </div>

      {/* ACTION BUTTON */}
      <div className="action-buttons">

        {/* UPLOAD ULANG */}
        <button
          className="retry-btn"
          onClick={() => navigate("/upload")}
        >
          Upload Ulang
        </button>

        {/* REFRESH */}
        <button
          className="retry-btn secondary"
          onClick={handleRefreshResult}
          disabled={isRefreshing}
        >

          <RotateCcw
            size={18}
            className={
              isRefreshing
                ? "spin-icon"
                : ""
            }
          />

          {isRefreshing
            ? "Mendeteksi..."
            : "Deteksi Ulang"}

        </button>

        {/* HISTORY */}
        <button
          className="retry-btn history-btn"
          onClick={() =>
            navigate("/history")
          }
        >
          Lihat Riwayat
        </button>

      </div>

      {/* CONTENT */}
      <div className="hasil-content">

        {/* RESULT */}
        <div className="info-box">
          <h3>{data?.result}</h3>
          <p>
            {kategoriInfo?.description}
          </p>
        </div>

        {/* MODERN RESULT CARD */}
        <div className="modern-card">
          <h2 className="modern-title">
            {data?.title}
          </h2>

          <div className="modern-description">
            {data?.description
              ?.split("\n")
              .filter(
                (text) =>
                  text.trim() !== ""
              )
              .map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
          </div>

          <img
            src={data?.image}
            alt={data?.kategori}
            className="modern-image"
          />

          {data?.handling && (
            <div className="point-wrapper">
              <h4>{data?.handlingTitle}</h4>
              <ul className="modern-points">
                {data.handling.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {data?.facilityImage && (
            <img
              src={data.facilityImage}
              alt="fasilitas"
              className="modern-image"
            />
          )}

          {data?.image2 && (
            <img
              src={data.image2}
              alt="Fasilitas Organik"
              className="modern-image"
            />
          )}

          {data?.publicGuide && (

            <div className="point-wrapper">
              <h4>{data?.publicGuideTitle}</h4>
              <ul className="modern-points">
                {data.publicGuide.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {data?.benefitsText && (
            <div className="modern-description">
              <p>{data.benefitsText}</p>
            </div>
          )}

          {data?.benefits && (

            <div className="point-wrapper">
              <h4>
                {data?.benefitsTitle}
              </h4>
              <ul className="modern-points">
                {data.benefits.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <p className="modern-note">
            {data?.note}
          </p>
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="feedback-box">

        <p className="feedback-title">
          Apakah Anda puas dengan hasil
          EcoSortAI?
        </p>

        <div className="feedback-icons">

          {/* LIKE */}
          <div
            className={`feedback-item ${feedback === "like"
              ? "active"
              : ""
              }`}
            onClick={() =>
              !isSubmitted &&
              setFeedback("like")
            }
          >
            <img
              src="/like.png"
              alt="like"
              className="feedback-img"
            />

            <span>Ya</span>

          </div>

          {/* DISLIKE */}
          <div
            className={`feedback-item ${feedback === "dislike"
              ? "active"
              : ""
              }`}
            onClick={() =>
              !isSubmitted &&
              setFeedback("dislike")
            }
          >
            <img
              src="/dislike.png"
              alt="dislike"
              className="feedback-img"
            />

            <span>Tidak</span>

          </div>

        </div>

        {/* TEXTAREA */}
        <textarea
          placeholder="Tulis feedback anda disini..."
          value={feedbackText}
          onChange={(e) =>
            setFeedbackText(e.target.value)
          }
          disabled={isSubmitted}
        />

        {/* BUTTON */}
        <button
          className="kirim-btn"
          onClick={handleSubmitFeedback}
          disabled={isSubmitted}
        >
          {isSubmitted
            ? "Feedback Terkirim"
            : "Kirim Feedback"}
        </button>

      </div>

      {/* NOTIFICATION */}
      {showNotif && (
        <div className="feedback-notif">
          Feedback berhasil dikirim
        </div>
      )}

    </div>
  );
}

export default Hasil;