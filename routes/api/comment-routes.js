const router = require('express').Router();
const {
    addComment,
    removeComment
} = require('../../controllers/comment-controller');

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:pizzaId')
  .get(addComment)
  .put(addComment)

// Set up GET all and POST at /api/pizzas
router
  .route('/:pizzaId/:commentId')
  .get(getAllPizza)
  .post(createPizza);

module.exports = router;