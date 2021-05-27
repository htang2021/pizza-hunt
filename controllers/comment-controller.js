const { Pizza, Comment } = require('../models');

const commentController = {
    // the functions will go in here as methods
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    {_id: params.pizzaId },
                    { $push: { comments: _id } },
                    {new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // add reply to comment and within comment schema
    addReply({ params, body }, res) {
        // console.log(body);
        Comment.findByIdAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },
            { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
                
            })
            .catch(err => res.json(err));
    },

    // remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deleteComment => {
                if (!deleteComment) {
                    return res.status(404).json({ message: 'No pizza found with this id!' });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    removeReply({ params }, res) {
        // console.log(body);
        Comment.findByIdAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.replyId }  } },
            { new: true })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    }
};

module.exports = commentController;