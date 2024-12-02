const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();

app.use(cors());

const KEY_FILE = './path/to/your-service-account-key.json'; // JSON 키 파일 경로
const VIEW_ID = 'YOUR_VIEW_ID'; // Google Analytics View ID

// Google Analytics 데이터 가져오기
async function getPageViews() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    });

    const analytics = google.analyticsreporting({
        version: 'v4',
        auth
    });

    const response = await analytics.reports.batchGet({
        requestBody: {
            reportRequests: [
                {
                    viewId: VIEW_ID,
                    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                    metrics: [{ expression: 'ga:pageviews' }],
                    dimensions: [{ name: 'ga:pagePath' }]
                }
            ]
        }
    });

    return response.data.reports[0].data.rows;
}

// API 엔드포인트 생성
app.get('/api/views', async (req, res) => {
    try {
        const data = await getPageViews();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Google Analytics data:', error);
        res.status(500).send('Error fetching data');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
