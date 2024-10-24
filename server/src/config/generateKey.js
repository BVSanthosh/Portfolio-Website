const crypto = require('crypto');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath});

try {
    const secretKey = crypto.randomBytes(64).toString('hex');
    const envContent = fs.readFileSync(envPath, 'utf8');

    if (envContent.includes('SECRET_KEY=')) {
        const updatedContent = envContent.replace(/SECRET_KEY=.*/, `SECRET_KEY=${secretKey}`);
        fs.writeFileSync(envPath, updatedContent, 'utf8');
        console.log('SECRET_KEY updated in .env file');
    } else {
        fs.appendFileSync(envPath, `\nSECRET_KEY=${secretKey}\n`);
        console.log('SECRET_KEY added to .env file');
    }
} catch(error) {
    console.error('Error reading or writing to the .env file:');
}