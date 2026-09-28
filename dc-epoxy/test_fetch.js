fetch('https://google.com', {
  headers: {
    'Authorization': 'Bearer ' + 'some_token\n'
  }
}).then(console.log).catch(e => console.log('Error:', e.message));
