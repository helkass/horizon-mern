const router = require("express").Router();
const {getAllBlogs, createBlog, getBlogById, deleteBlog} = require("../controller/blogs");

router.get('/', getAllBlogs);

router.post('/create', createBlog);

router.get('/:id', getBlogById);

router.delete('/delete/:id', deleteBlog);

module.exports = router;
