document.addEventListener("DOMContentLoaded", function() {
    // 初始化页面
    initializeMessageForm();
    loadMessages();
    initializeSearchForm();
    updateLatest();
    initializeRecommendations();
    addNavigationSmoothScroll();
});

// 留言表单处理
function initializeMessageForm() {
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const messageContent = document.getElementById('message').value;
            if (messageContent.trim() === '') {
                alert('留言内容不能为空');
                return;
            }
            const newMessage = {
                content: messageContent,
                date: new Date().toLocaleDateString(),
                user: '匿名用户'
            };
            addMessage(newMessage);
            saveMessage(newMessage);
            document.getElementById('message').value = ''; // 清空文本框
        });
    }
}

function addMessage(message) {
    const messageList = document.getElementById('messageList');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <p>${message.user}: ${message.content}</p>
        <p><small>${message.date}</small></p>
    `;
    messageList.appendChild(messageDiv);
}

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(message => addMessage(message));
}

// 搜索表单处理
function initializeSearchForm() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            performSearch();
        });
    }
}

function performSearch() {
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;

    const articles = [
        { title: '文章1', date: '2024-05-01', content: '这是文章1的内容' },
        { title: '文章2', date: '2024-05-02', content: '这是文章2的内容' }
    ];

    const media = [
        { title: '图片1', date: '2024-05-01', url: '../image/person.jpg', type: 'image' },
        { title: '视频1', date: '2024-05-02', url: '../video/sample.mp4', type: 'video' }
    ];

    const articleResults = articles.filter(article => 
        (title === '' || article.title.includes(title)) && 
        (date === '' || article.date === date)
    );

    const mediaResults = media.filter(item => 
        (title === '' || item.title.includes(title)) && 
        (date === '' || item.date === date)
    );

    updateResults(articleResults, mediaResults);
}

function updateResults(articleResults, mediaResults) {
    const articleResultsDiv = document.getElementById('article-results');
    const mediaResultsDiv = document.getElementById('media-results');

    articleResultsDiv.innerHTML = articleResults.map(article => 
        `<div>
            <h4>${article.title}</h4>
            <p>${article.content}</p>
            <p><small>${article.date}</small></p>
        </div>`
    ).join('');

    mediaResultsDiv.innerHTML = mediaResults.map(item => 
        `<div>
            <h4>${item.title}</h4>
            ${item.type === 'image' ? 
                `<img src="${item.url}" alt="${item.title}" style="width:100px;">` : 
                `<video controls width="250">
                    <source src="${item.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`}
            <p><small>${item.date}</small></p>
        </div>`
    ).join('');
}

// 推荐内容初始化
function initializeRecommendations() {
    const recommendations = [
        {
            title: '数学建模论文使用工具推荐',
            description: '关注公众号【益黑科技】，每日学习数模新技能',
            image: '/image/recommend1.jpg',
            link: '#'
        },
        {
            title: '和我的天使在一起啦',
            description: '股单聊',
            image: '/image/recommend2.jpg',
            link: '#'
        },
        {
            title: '阶段小结-努力总会得到回响',
            description: '关注公众号【益黑科技】，每日学习数模新技能',
            image: '/image/recommend3.jpg',
            link: '#'
        }
    ];

    const recommendationContainer = document.querySelector('.recommendation-cards');
    if (recommendationContainer) {
        recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.classList.add('recommendation-card');
            
            card.innerHTML = `
                <img src="${rec.image}" alt="${rec.title}">
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <a href="${rec.link}" class="btn">阅读更多</a>
            `;

            recommendationContainer.appendChild(card);
        });
    }
}

function updateLatest() {
    const today = new Date().toISOString().split('T')[0];
    const latestResults = document.getElementById('latest-results');

    if (latestResults) {
        const articles = [
            { title: '文章3', date: '2024-05-03', content: '这是文章3的内容。', image: '/image/read3.jpg', link: 'article3.html' }
        ];
    
        const latestArticles = articles.filter(article => article.date <= today).sort((a, b) => new Date(b.date) - new Date(a.date));
    
        if (latestArticles.length > 0) {
            const latestArticle = latestArticles[0];
    
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('col-md-4', 'mb-3');
    
            const card = document.createElement('div');
            card.classList.add('card');
    
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
    
            const titleElem = document.createElement('h5');
            titleElem.classList.add('card-title');
            titleElem.textContent = latestArticle.title;
    
            const dateElem = document.createElement('p');
            dateElem.classList.add('card-text');
            dateElem.textContent = `日期: ${latestArticle.date}`;
    
            const contentElem = document.createElement('p');
            contentElem.classList.add('card-text');
            contentElem.textContent = latestArticle.content;
    
            const imageElem = document.createElement('img');
            imageElem.classList.add('card-img-top');
            imageElem.src = latestArticle.image;
            imageElem.alt = latestArticle.title;
    
            const linkElem = document.createElement('a');
            linkElem.classList.add('btn', 'btn-primary');
            linkElem.href = latestArticle.link;
            linkElem.textContent = '查看全文';
    
            cardBody.appendChild(titleElem);
            cardBody.appendChild(dateElem);
            cardBody.appendChild(contentElem);
            cardBody.appendChild(linkElem);
            card.appendChild(imageElem);
            card.appendChild(cardBody);
            articleDiv.appendChild(card);
    
            latestResults.appendChild(articleDiv);
        } else {
            latestResults.textContent = '没有找到最新的文章。';
        }
    }
}

// 添加导航平滑滚动
function addNavigationSmoothScroll() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });
}
/*share*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript is working!");

    // 动态加载最新内容
    const latestContent = document.getElementById('latest-content');
    setTimeout(() => {
        latestContent.innerHTML += `
            <div>
                <h4>最新文章1</h4>
                <p>这是最新文章1的内容。</p>
                <p><small>2024-05-01</small></p>
            </div>
            <div>
                <h4>最新文章2</h4>
                <p>这是最新文章2的内容。</p>
                <p><small>2024-05-02</small></p>
            </div>
        `;
    }, 1000);

    // 滑动效果
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });
});

function performSearch() {
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;

    // 假设我们有一个静态的数据源
    const articles = [
        { title: '文章1', date: '2024-05-01', content: '这是文章1的内容' },
        { title: '文章2', date: '2024-05-02', content: '这是文章2的内容' },
        { title: '文章3', date: '2024-05-03', content: '这是文章3的内容' }
    ];

    const media = [
        { title: '图片1', date: '2024-05-01', url: '../image/person.jpg', type: 'image' },
        { title: '视频1', date: '2024-05-02', url: '../video/sample.mp4', type: 'video' }
    ];

    // 查询文章
    const articleResults = articles.filter(article => 
        (title === '' || article.title.includes(title)) && 
        (date === '' || article.date === date)
    );

    // 查询媒体
    const mediaResults = media.filter(item => 
        (title === '' || item.title.includes(title)) && 
        (date === '' || item.date === date)
    );

    // 更新页面内容
    const articleResultsDiv = document.getElementById('article-results');
    const mediaResultsDiv = document.getElementById('media-results');

    articleResultsDiv.innerHTML = articleResults.map(article => 
        `<div>
            <h4>${article.title}</h4>
            <p>${article.content}</p>
            <p><small>${article.date}</small></p>
        </div>`
    ).join('');

    mediaResultsDiv.innerHTML = mediaResults.map(item => 
        `<div>
            <h4>${item.title}</h4>
            ${item.type === 'image' ? 
                `<img src="${item.url}" alt="${item.title}" style="width:100px;">` : 
                `<video controls width="250">
                    <source src="${item.url}" type="video/mp4">
                    你的浏览器不支持视频标签。
                </video>`}
            <p><small>${item.date}</small></p>
        </div>`
    ).join('');
}
