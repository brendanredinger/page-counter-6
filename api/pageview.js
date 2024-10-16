const { google } = require('googleapis');

module.exports = async (req, res) => {
  const pageName = req.query.page;
  const viewCount = await getPageViews(pageName);
  res.json({ view_count: viewCount });
};

async function getPageViews(pageName) {
  const analytics = google.analytics('v1');
  const response = await analytics.data.ga.get({
    'property': '463519249', // Replace with your GA4 property ID
    'start-date': '30daysAgo',
    'end-date': 'today',
    'metrics': 'ga:pageviews',
    'dimensions': 'ga:pagePath',
    'filters': `ga:pagePath==/${pageName}`,
  });

  const rows = response.data.rows;
  if (rows && rows.length > 0) {
    return rows[0][1];
  }
  return 0;
}
