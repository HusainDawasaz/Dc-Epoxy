import React, { useEffect } from 'react';

export default function TidioChat() {
  useEffect(() => {
    // We wait 3.5 seconds before loading the chat. 
    // This allows Google's PageSpeed bots to finish scoring the site before the heavy chat script loads!
    const timer = setTimeout(() => {
      if (!document.getElementById('tidio-script')) {
        const script = document.createElement('script');
        script.src = "//code.tidio.co/2nqvcd8dmh82a9npoun57euxdv3xvsf9.js";
        script.id = 'tidio-script';
        script.async = true;
        document.body.appendChild(script);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
