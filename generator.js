const fs = require('fs');

const requires = [];

for (let i = 1; i <= 100; i++) {
    // 1 -> 0001
    // 11 -> 0011
    // 111 -> 0111
    // 1111 -> 1111
    const padded = i.toString().padStart(4, '0');

    requires.push(`require(\'./assets/pack/${padded}.png\'),`);
}

// Create images.js
fs.writeFile('images.js', 'const images = [' + requires.join('') + ']; export default images;', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});


