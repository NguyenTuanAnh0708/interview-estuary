const getRandomDelay = () => Math.floor(Math.random() * (500 - 200 + 1)) + 200;

// Helper to get and save data
const getData = (key) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem(key)) || [];
            resolve(data);
        }, getRandomDelay());
    });
};

const saveData = (key, data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(data));
            resolve();
        }, getRandomDelay());
    });
};


const getPosts = () => getData('posts');

const savePosts = (posts) => saveData('posts', posts);

const updatePost = async (id, updatedContent) => {
    const posts = await getPosts();
    const updatedPosts = posts.map(post =>
        post.id === id ? { ...post, ...updatedContent } : post
    );
    await savePosts(updatedPosts);
};

const deletePost = async (id) => {
    const posts = await getPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    await savePosts(updatedPosts);
};


const getComments = (postId) => getData(`comments_${postId}`);

const saveComments = (postId, comments) => saveData(`comments_${postId}`, comments);

const updateComment = async (postId, id, updatedText) => {
    const comments = await getComments(postId);
    const updatedComments = comments.map(comment =>
        comment.id === id ? { ...comment, text: updatedText } : comment
    );
    await saveComments(postId, updatedComments);
};

const deleteComment = async (postId, id) => {
    const comments = await getComments(postId);
    const updatedComments = comments.filter(comment => comment.id !== id);
    await saveComments(postId, updatedComments);
};

export {
    getPosts,
    savePosts,
    updatePost,
    deletePost,
    getComments,
    saveComments,
    updateComment,
    deleteComment
};
