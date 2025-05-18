const posts = [
    { id: 1, name: 'Pots 1' },
    { id: 2, name: 'Post 2' }
];



export const getPosts = (req, res) => {
    res.json(posts)
}


export const getPostInfo = (req, res) => {

    const post = posts.find(u => u.id == req.params.id);

    if (!post) return res.status(404).send('Post not found');

    res.json(post);

}