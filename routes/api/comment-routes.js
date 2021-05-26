const router = require('express').Router();
const {
    addComment,
    removeComment
} = require('../../controllers/comment-controller');

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
    // /api/comments/<pizzaId.
  .route('/:pizzaId')
  .post(addComment);

// Set up GET all and POST at /api/pizzas
router
    // /api/comments/<pizzaId>/<commentId>
  .route('/:pizzaId/:commentId')
  .delete(removeComment);

module.exports = router;