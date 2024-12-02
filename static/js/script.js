// 햄버거 메뉴 토글 기능
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  if (navMenu.classList.contains("hidden")) {
    navMenu.classList.remove("hidden");
    navMenu.classList.add("visible");
  } else {
    navMenu.classList.remove("visible");
    navMenu.classList.add("hidden");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const latestContainer = document.getElementById("latest-posts");
  const hotContainer = document.getElementById("hot-posts");
  const trendContainer = document.getElementById("trend-posts");

  // JSON 데이터 (실제 API나 JSON 파일에서 불러올 수 있음)
  const articles = [
    {
      "title": "정치 뉴스1",
      "url": "#",
      "category": "politics",
      "views": 120,
      "timestamp": "2024-12-02T14:00:00"
    },
    {
      "title": "경제 뉴스1",
      "url": "#",
      "category": "economy",
      "views": 150,
      "timestamp": "2024-12-02T12:00:00"
    },
    {
      "title": "IT 뉴스1",
      "url": "#",
      "category": "science",
      "views": 300,
      "timestamp": "2024-11-25T10:00:00"
    }
  ];

  const now = new Date();

  // Latest: 최신 글
  const latestArticles = articles
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 3);
  latestArticles.forEach((article) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${article.url}">${article.title}</a>`;
    latestContainer.appendChild(li);
  });

  // Hot: 지난 3시간 동안 조회수가 높은 글
  const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000);
  const hotArticles = articles
    .filter((article) => new Date(article.timestamp) >= threeHoursAgo)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);
  hotArticles.forEach((article) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${article.url}">${article.title}</a>`;
    hotContainer.appendChild(li);
  });

  // Trend: 지난 1주일 동안 조회수가 높은 글
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const trendArticles = articles
    .filter((article) => new Date(article.timestamp) >= oneWeekAgo)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);
  trendArticles.forEach((article) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${article.url}">${article.title}</a>`;
    trendContainer.appendChild(li);
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const latestContainer = document.getElementById("latest-posts");
    const hotContainer = document.getElementById("hot-posts");
    const trendContainer = document.getElementById("trend-posts");
  
    // JSON 데이터 (실제 API나 JSON 파일에서 불러올 수 있음)
    const articles = [
      {
        "title": "정치 뉴스1",
        "url": "#",
        "category": "politics",
        "views": 120,
        "timestamp": "2024-12-02T14:00:00"
      },
      {
        "title": "경제 뉴스1",
        "url": "#",
        "category": "economy",
        "views": 150,
        "timestamp": "2024-12-02T12:00:00"
      },
      {
        "title": "IT 뉴스1",
        "url": "#",
        "category": "science",
        "views": 300,
        "timestamp": "2024-11-25T10:00:00"
      }
    ];
  
    const now = new Date();
    document.addEventListener('DOMContentLoaded', () => {
        const latestContainer = document.getElementById('latest-posts');
        const hotContainer = document.getElementById('hot-posts');
        const trendContainer = document.getElementById('trend-posts');
    
        // 서버 API 호출
        fetch('http://localhost:3000/api/views')
            .then(response => response.json())
            .then(data => {
                const now = new Date();
    
                // Latest: 최신 글 3개
                const latest = data.slice(0, 3);
                latest.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${post.dimensions[0]}">${post.dimensions[0]} (${post.metrics[0].values[0]} views)</a>`;
                    latestContainer.appendChild(li);
                });
    
                // Hot: 지난 3시간 조회수 탑 3
                const threeHoursAgo = new Date(now - 3 * 60 * 60 * 1000);
                const hot = data
                    .filter(post => new Date(post.timestamp) >= threeHoursAgo)
                    .sort((a, b) => b.metrics[0].values[0] - a.metrics[0].values[0])
                    .slice(0, 3);
                hot.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${post.dimensions[0]}">${post.dimensions[0]} (${post.metrics[0].values[0]} views)</a>`;
                    hotContainer.appendChild(li);
                });
    
                // Trend: 지난 1주일 조회수 탑 3
                const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
                const trend = data
                    .filter(post => new Date(post.timestamp) >= oneWeekAgo)
                    .sort((a, b) => b.metrics[0].values[0] - a.metrics[0].values[0])
                    .slice(0, 3);
                trend.forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${post.dimensions[0]}">${post.dimensions[0]} (${post.metrics[0].values[0]} views)</a>`;
                    trendContainer.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });