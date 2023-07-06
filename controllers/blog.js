const mongoose = require('mongoose');

const Blog = require('../models/blog');

const getAllBlogs = async(req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    if(!blogs){
        return res.status(400).json({error: "No contacts found"});
    }
    res.status(200).send(blogs);
}

const getABlog = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No id found related to that id"});
    }
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(400).json({error: "No blog found"});
    }
    res.status(200).json(blog);
}

const createABlog = async (req, res) => {

    let blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        img: req.file.filename
    });

    try{
        const saveBlog = blog.save();
        res.status(200).json(saveBlog);
    }catch(error){
        res.status(400).json( {error: error.message} );
    }
}

const deleteABlog = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No id found related to that id"});
    }
    const blog = await Blog.findOneAndDelete({_id: id});
    if(!blog){
        return res.status(400).json({error: "No blog found"});
    }
    res.status(200).json(blog);
}

const updateABlog = async (req, res) => {

    // const { id } = req.params;

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(400).json({error: "No id found related to that id"});
    // }

    // const blog = await Blog.findByIdAndUpdate({_id: id}, {
    //     ...req.body
    // });

    // if(!blog){
    //     return res.status(400).json({error: "No contact found"});
    // }

    // res.status(200).json(blog);

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No id found related to that id"});
    }

    if(req.file){
        let blog = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            img: req.file.filename
        }

        const updatedBlog = await Blog.findByIdAndUpdate({_id: id}, blog);

        res.status(200).json(updatedBlog);

    }else{
        const blog = await Blog.findByIdAndUpdate({_id: id}, {
            ...req.body
        });
    
        if(!blog){
            return res.status(400).json({error: "No contact found"});
        }
    
        res.status(200).json(blog);
    }


}

module.exports = {
    getABlog,
    getAllBlogs,
    createABlog,
    deleteABlog,
    updateABlog
}








