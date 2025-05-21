
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwdxnueyqwoqrshzuvrs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZHhudWV5cXdvcXJzaHp1dnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDY5NzcsImV4cCI6MjA2MzQyMjk3N30.ymvB59gTCgNJdWfz82gYiebQImyKAG10cARNkFOsTqs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SGKEczaciAsistani() {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [kullanici, setKullanici] = useState(null);
  const [ilac, setIlac] = useState('');
  const [icd10, setIcd10] = useState('');
  const [rapor, setRapor] = useState('Raporlu');
  const [sonuc, setSonuc] = useState('');

  const girisYap = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: sifre });
    if (error) setMesaj('❌ Giriş başarısız: ' + error.message);
    else {
      setKullanici(data.user);
      setMesaj('');
    }
  };

  const sorgula = () => {
    if (ilac.toLowerCase().includes('parol') && icd10.toUpperCase() === 'J06.9' && rapor === 'Raporsuz') {
      setSonuc('✅ SGK tarafından karşılanır.');
    } else {
      setSonuc('⚠️ Bu kombinasyon için ödeme bilgisi tanımlı değil.');
    }
  };

  if (!kullanici) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-center">SGK Eczacı Asistanı Giriş</h1>
          <input type="email" placeholder="E-posta" className="border p-2 mb-2 w-full"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Şifre" className="border p-2 mb-4 w-full"
            value={sifre} onChange={(e) => setSifre(e.target.value)} />
          <button onClick={girisYap} className="bg-blue-600 text-white w-full p-2 rounded">Giriş Yap</button>
          {mesaj && <p className="mt-4 text-center">{mesaj}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">SGK İlaç Sorgulama Paneli</h1>
      <div className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1 font-medium">İlaç Adı / Barkod</label>
          <input value={ilac} onChange={(e) => setIlac(e.target.value)} placeholder="Parol / 869..." className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tanı Kodu (ICD-10)</label>
          <input value={icd10} onChange={(e) => setIcd10(e.target.value)} placeholder="J06.9" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Rapor Durumu</label>
          <select value={rapor} onChange={(e) => setRapor(e.target.value)} className="border p-2 w-full">
            <option>Raporlu</option>
            <option>Raporsuz</option>
          </select>
        </div>
        <button onClick={sorgula} className="bg-green-600 text-white w-full p-2 rounded">Sorgula</button>
        {sonuc && <div className="bg-white p-4 rounded shadow"><strong>Sonuç:</strong> {sonuc}</div>}
      </div>
    </div>
  );
}
