const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Contact form endpoint
app.post('/contact', (req, res) => {
  const { fname, lname, email, subject, message, budget } = req.body;
  console.log('Commission enquiry received:');
  console.log(`  Name: ${fname} ${lname}`);
  console.log(`  Email: ${email}`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Budget: ${budget}`);
  console.log(`  Message: ${message}`);
  res.json({ success: true });
});

// Newsletter signup endpoint
app.post('/newsletter', (req, res) => {
  const { nl_name, nl_email } = req.body;
  console.log('Newsletter signup:');
  console.log(`  Name: ${nl_name}`);
  console.log(`  Email: ${nl_email}`);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Madeleine Town Art — running at http://localhost:${PORT}`);
});
