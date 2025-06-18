export default function FormSerahTerima() {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">
          SERAH TERIMA FASILITAS PERUSAHAAN
        </h1>
  
        <p>Yang bertandatangan di bawah ini:</p>
  
        {/* Pihak Pertama */}
        <div>
          <h2 className="font-semibold">Pihak Pertama:</h2>
          <div className="grid grid-cols-3 gap-2">
            <div>Nama</div><div>:</div><div>Achmad Batul</div>
            <div>Jabatan</div><div>:</div><div>IT Hardware & Infrastructure Staff</div>
            <div>Departemen</div><div>:</div><div>IT</div>
          </div>
        </div>
  
        {/* Pihak Kedua */}
        <div>
          <h2 className="font-semibold">Pihak Kedua:</h2>
          <div className="grid grid-cols-3 gap-2">
            <div>Nama</div><div>:</div><div>Erny Indrawati</div>
            <div>Jabatan</div><div>:</div><div>Internal Audit Manager</div>
            <div>Departemen</div><div>:</div><div>Internal Audit</div>
            <div>Alamat</div><div>:</div><div>Puri Asri Regency E-20</div>
          </div>
        </div>
  
        <p>
          Dalam hal ini bertindak untuk dan atas nama divisi masing-masing, menyatakan telah melakukan serah terima fasilitas perusahaan berikut:
        </p>
  
        {/* Daftar Fasilitas */}
        <div>
          <h2 className="font-semibold">1. Perangkat Laptop</h2>
          <div className="grid grid-cols-3 gap-2">
            <div>Merek</div><div>:</div><div>Lenovo</div>
            <div>Tipe</div><div>:</div><div>14IAH8</div>
            <div>Serial Number</div><div>:</div><div>PF56KGYE</div>
            <div>Processor</div><div>:</div><div>Intel Core i5 12450H</div>
            <div>Storage</div><div>:</div><div>SSD 512GB</div>
            <div>RAM</div><div>:</div><div>16GB</div>
            <div>Ukuran Layar</div><div>:</div><div>11 Inch</div>
            <div>Sistem Operasi</div><div>:</div><div>Windows 11 Home</div>
            <div>Office</div><div>:</div><div>MS. Office 365 Business</div>
          </div>
        </div>
  
        {/* Software */}
        <div>
          <h2 className="font-semibold">2. Software Terinstall</h2>
          <ul className="list-disc ml-6">
            <li>Avast Free Antivirus</li>
            <li>Google Chrome</li>
            <li>Anydesk</li>
            <li>Microsoft Edge</li>
            <li>Office 365 Business</li>
            <li>Tight VNC</li>
          </ul>
        </div>
  
        {/* Kelengkapan Tambahan */}
        <div>
          <h2 className="font-semibold">3. Kelengkapan Tambahan</h2>
          <ul className="list-disc ml-6">
            <li>Charger</li>
            <li>Tas</li>
          </ul>
        </div>
  
        {/* Pernyataan */}
        <div className="space-y-3">
          <p>1. Bahwa Fasilitas perusahaan yang diterima oleh Pihak Kedua adalah benar dan dalam kondisi baik.</p>
          <p>2. Bahwa Pihak Kedua bertanggung jawab atas pemeliharaan dan keamanan fasilitas tersebut.</p>
          <p>3. Bahwa Pihak Kedua bersedia mengembalikan fasilitas tersebut dalam kondisi baik apabila diminta oleh perusahaan.</p>
        </div>
  
        {/* Tanda Tangan */}
        <div className="grid grid-cols-2 gap-8 text-center mt-10">
          <div>
            <p>Bandung, [Tanggal]</p>
            <p className="font-semibold">Pihak Pertama</p>
            <div className="h-24"></div>
            <p>( Achmad Batul )</p>
          </div>
          <div>
            <p>&nbsp;</p>
            <p className="font-semibold">Pihak Kedua</p>
            <div className="h-24"></div>
            <p>( Erny Indrawati )</p>
          </div>
        </div>
      </div>
    );
  }
  