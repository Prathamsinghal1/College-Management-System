const bcrypt = require('bcryptjs');

async function testHashing() {
  try {
    const password = 'Ram123@'; // Replace with your test password
    console.log('Original password:', password);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password:', hashedPassword);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password match result:', isMatch); // Should be true
  } catch (error) {
    console.error('Error:', error);
  }
}

testHashing();
