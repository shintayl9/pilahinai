import "../styles/howitworks.css"

function HowItWorks() {
    return (
        <div className="howitworks-page">
            <section className="howitworks-hero-section">
                <div className="wrapper">
                    <div className="howitworks-hero-content">
                        <div className="howitworks-hero-text">
                            <h1>PilahinAI</h1>
                            <p>
                                Platform berbasis AI untuk klasifikasi sampah dan solusi pengelolaannya yang cerdas.
                            </p>
                            <button className="howitworks-cta-button">Cek Sampahmu disini!</button>
                        </div>
                        <div className="howitworks-hero-image">
                            <img src="/new-logo-pilahinai.png" alt="Logo" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="steps-title-wrapper">
                <div className="wrapper">
                    <h2 className="steps-title">Cara Kerja PilahinAI</h2>
                </div>
            </div>

            {/* Main Content */}
            <section className="steps-detail">
                <div className="wrapper">
                    {/* Step Upload Gambar */}
                    <div className="step-item step-left">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h2>Upload Gambar</h2>
                            <p>Upload gambar sampah yang ingin kamu klasifikasikan melalui halaman upload PilahinAI. Sistem mendukung berbagai jenis gambar sampah seperti organik, anorganik, residu, maupun limbah B3. Setelah gambar dipilih, pengguna dapat langsung mengirim gambar untuk diproses oleh AI.
                            </p>
                        </div>
                    </div>

                    {/* Step AI Menganalisis */}
                    <div className="step-item step-right">
                        <div className="step-content">
                            <h2>AI Menganalisis</h2>
                            <p>PilahinAI akan memproses gambar menggunakan teknologi Artificial Intelligence untuk mengenali jenis sampah berdasarkan bentuk, warna, dan karakteristik objek pada gambar. Proses analisis dilakukan secara otomatis dalam beberapa detik menggunakan model machine learning yang telah dilatih sebelumnya.
                            </p>
                        </div>
                        <div className="step-number">2</div>
                    </div>

                    {/* Step Hasil Klasifikasi */}
                    <div className="step-item step-left">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h2>Hasil Klasifikasi</h2>
                            <p>Setelah proses analisis selesai, sistem akan menampilkan hasil klasifikasi sampah beserta tingkat akurasi deteksi. Pengguna juga dapat melihat penjelasan kategori sampah, melakukan deteksi ulang, serta menyimpan riwayat hasil klasifikasi untuk dilihat kembali kapan saja.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HowItWorks;