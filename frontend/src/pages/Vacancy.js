import React, { useState } from 'react';
import './Vacancy.css';

function Vacancy() {
  const [file, setFile] = useState(null);
  const [resultReady, setResultReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Пожалуйста, загрузите ваше фото!");
    
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResultReady(true);
    }, 2500);
  };

  return (
    <div className="vacancy-container">
      <div className="vacancy-card">
        <h2 className="title-red">Отдел кадров Семисвинофф</h2>
        
        {!resultReady ? (
          <div className="upload-section">
            <p className="instruction">
              Для трудоустройства курьером или кассиром пройдите биометрический тест на совместимость.
            </p>
            
            <form onSubmit={handleUpload} className="vacancy-form">
              <div className="file-input-wrapper">
                 <span className="file-name">{file ? file.name : "Файл не выбран"}</span>
                 <label className="custom-file-upload">
                   <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                   Выбрать фото
                 </label>
              </div>

              <button type="submit" className="btn-red-large" disabled={loading}>
                {loading ? "ИИ СЕМИСВИН-4.5 анализирует данные..." : "ПРОВЕРИТЬ СОВМЕСТИМОСТЬ"}
              </button>
            </form>
          </div>
        ) : (
          <div className="result-section">
            <div className="stamp-success">ПРИНЯТ!</div>
            <h3>АНАЛИЗ ЗАВЕРШЕН: 100% СОВПАДЕНИЕ</h3>
            
            <div className="id-card">
               <img src="/pig-pass.jpg" alt="Ваше фото в системе" className="result-img" />
               <div className="id-info">
                 <p><strong>ДОЛЖНОСТЬ:</strong> Лицо бренда</p>
                 <p><strong>СТАТУС:</strong> Великолепен</p>
               </div>
            </div>

            <div className="action-buttons">
                <a href="/pig-pass.jpg" download="Semisvinoff_Pass.jpg" className="btn-download">
                    СКАЧАТЬ ПРОПУСК (.JPG)
                </a>
                <button onClick={() => {setResultReady(false); setFile(null)}} className="btn-back">
                    Проверить другого кандидата
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vacancy;