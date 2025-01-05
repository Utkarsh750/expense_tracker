import cron from 'cron';
import https from 'https';

const URL = 'https://expense-tracker-wzwc.onrender.com/';
let interval = 15; // initial interval in minutes
const maxInterval = 60; // maximum interval in minutes

const job = new cron.CronJob(`*/${interval} * * * *`, function() {
  https.get(URL, (res) => {
    if (res.statusCode === 200) {  
      console.log('GET request sent successfully');
      if (interval < maxInterval) {
        interval = Math.min(interval * 2, maxInterval); // exponential backoff
        updateJob();
      }
    } else {
      console.log('GET request failed', res.statusCode);
      interval = 15; // reset interval on failure
      updateJob();
    }
  }).on('error', (e) => {
    console.error('Error while sending request', e);
    interval = 15; // reset interval on error
    updateJob();
  });
});

const updateJob = () => {
  job.stop();
  job.setTime(new cron.CronTime(`*/${interval} * * * *`));
  job.start();
};

job.start();

export default job;


// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals or specific times
// send 1 GET request for every 14 minutes


//  a schedule using a cron expression, which consists of five fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour