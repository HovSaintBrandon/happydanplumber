// ========================================
// Single Post Dynamic Loading
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const postLoading = document.getElementById('postLoading');
    const postArticle = document.getElementById('postArticle');
    const postTitle = document.getElementById('postTitle');
    const postMeta = document.getElementById('postMeta');
    const postImage = document.getElementById('postImage');
    const postContent = document.getElementById('postContent');
    const postTags = document.getElementById('postTags');

    async function fetchAndRenderPost() {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (!slug) {
            postLoading.innerHTML = '<h2>Post not found</h2><p><a href="blog.html">Back to Blog</a></p>';
            return;
        }

        try {
            const response = await window.happyDanApi.getBlogPost(slug);
            const post = response.data || response; // Handle both {data: post} and direct post response

            if (!post || (!post.title && !post._id)) {
                throw new Error('Post not found');
            }

            document.title = `${post.title} - Happy Dan Plumbers`;
            postTitle.textContent = post.title;

            const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-KE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) : 'Recently';

            postMeta.textContent = `${date} | By ${post.author || 'Admin'}`;

            postImage.src = post.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80';
            postImage.alt = post.title;

            // Using innerHTML because content is stored as HTML string in the API example provided
            postContent.innerHTML = post.content;

            if (post.categories && post.categories.length > 0) {
                postTags.innerHTML = post.categories.map(cat => `<span class="tag" style="background:var(--muted); padding:0.25rem 0.75rem; border-radius:100px; font-size:0.75rem; margin-left:0.5rem;">${cat}</span>`).join('');
            }

            postLoading.style.display = 'none';
            postArticle.style.display = 'block';

        } catch (error) {
            console.error('Failed to fetch post:', error);
            postLoading.innerHTML = '<h2>Error loading post</h2><p>Please try again later or return to the <a href="blog.html">Blog</a>.</p>';
        }
    }

    fetchAndRenderPost();
});
