import React, { useState } from 'react';

const TranslateComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text) return;

    setLoading(true);

    const apiKey = 'AIzaSyDOYZvj20isw_zi_d1iuCazAKVoBgssNJY'; // Replace with your Google API Key
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const requestBody = {
      q: text,
      target: targetLanguage,
    };

    try {
      // Adding a CORS proxy for now (for testing)
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // CORS proxy for development/testing purposes
      const response = await fetch(proxyUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      setTranslatedText(result.data.translations[0].translatedText);
    } catch (error) {
      console.error('Translation error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="border p-2 w-80 mb-4"
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        {/* Add more languages here */}
      </select>

      <button
        onClick={handleTranslate}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {translatedText && (
        <div className="mt-4">
          <h3 className="font-semibold">Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateComponent;
