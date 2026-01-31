// ========================================
// Blog Dynamic Loading
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    async function fetchAndRenderBlogs() {
        try {
            blogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Loading blog posts...</p>';

            const response = await window.happyDanApi.getBlogs();
            const blogs = response.posts || response.data || [];

            if (blogs.length === 0) {
                blogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No blog posts found.</p>';
                return;
            }

            // Map API response to HTML
            blogGrid.innerHTML = blogs.map(post => {
                const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }) : 'Recently';

                return `
                    <article class="blog-card" style="opacity: 1; transform: translateY(0);">
                        <div class="blog-image">
                            <img src="${post.image || 'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&q=80'}"
                                alt="${post.title}">
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">${date}</div>
                            <h3 class="blog-title">${post.title}</h3>
                            <p class="blog-excerpt">${post.excerpt || post.content.substring(0, 100) + '...'}</p>
                            <a href="post.html?slug=${post.slug || post._id}" class="blog-link">Read More &rarr;</a>
                        </div>
                    </article>
                `;
            }).join('');

        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            blogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--primary);">Failed to load blog posts. Please try again later.</p>';
        }
    }

    fetchAndRenderBlogs();
});
