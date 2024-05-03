import cron from 'node-cron';
import axios from 'axios';
// Schedule the API call at 9:00 AM every day
cron.schedule('56 16 * * *', async () => {
  console.log('Calling API at scheduled time...');
  try {
    const response = await axios.get(
      'http://127.0.0.1:8080/exitPro/student/late'
    );
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error calling API:', error);
  }
});
