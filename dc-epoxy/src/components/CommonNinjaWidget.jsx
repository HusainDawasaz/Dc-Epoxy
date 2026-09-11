import React, { useEffect } from 'react';

export default function CommonNinjaWidget({ pid }) {
  useEffect(() => {
    // To make CommonNinja work in a React app (SPA), we must force the script to run 
    // AFTER the component has been mounted, every time they visit the page.
    const scriptId = 'common-ninja-script';
    let existingScript = document.getElementById(scriptId);
    
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
    script.defer = true;
    document.body.appendChild(script);

    // Some CommonNinja setups need window to resize to paint
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 1000);

  }, [pid]);

  return (
    <div className={`commonninja_component pid-${pid}`}></div>
  );
}
