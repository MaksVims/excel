const delay = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms))

delay(1000)
    .then(data => console.log(data));
