
-- Update the cron job to run twice daily (6 AM and 6 PM)
SELECT cron.unschedule('daily-market-update');

SELECT cron.schedule(
  'twice-daily-market-update',
  '0 6,18 * * *', -- Runs at 6 AM and 6 PM every day
  'SELECT update_daily_market_data();'
);
