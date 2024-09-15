import { useEffect, useState } from 'react';
import lang from './Language';
import '../css/Translator.css';

function Translator() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('hi-IN');
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLanguages(lang);
  }, []);

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };

  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleTranslate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  const handleIconClick = (target, id) => {
    if (!fromText || !toText) return;

    if (target.classList.contains('fa-copy')) {
      if (id === 'from') {
        copyContent(fromText);
      } else {
        copyContent(toText);
      }
    } else {
      if (id === 'from') {
        utterText(fromText, fromLanguage);
      } else {
        utterText(toText, toLanguage);
      }
    }
  };

  return (
    <div className="translator-container">
      <div className="input-wrapper">
        <textarea
          name="from"
          className="text-area from-area"
          placeholder="Enter Text"
          value={fromText}
          onChange={(e) => setFromText(e.target.value)}
        />
        <textarea
          name="to"
          className="text-area to-area"
          value={toText}
          readOnly
        />
      </div>
      <div className="controls">
        <div className="row">
          <div className="icons">
            <i
              id="from"
              className="fa-solid fa-volume-high icon"
              onClick={(e) => handleIconClick(e.target, 'from')}
            />
            <i
              id="from"
              className="fa-solid fa-copy icon"
              onClick={(e) => handleIconClick(e.target, 'from')}
            />
          </div>
          <select
            className="select"
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="exchange" onClick={handleExchange}>
          <i className="fa-solid fa-arrow-right-arrow-left" />
        </div>
        <div className="row">
          <select
            className="select"
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <div className="icons">
            <i
              id="to"
              className="fa-solid fa-copy icon"
              onClick={(e) => handleIconClick(e.target, 'to')}
            />
            <i
              id="to"
              className="fa-solid fa-volume-high icon"
              onClick={(e) => handleIconClick(e.target, 'to')}
            />
          </div>
        </div>
      </div>
      <button
        className="translate-button"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
    </div>
  );
}

export default Translator;
