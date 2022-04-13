var router = require('express').Router();


router.use('/', require('../../controllers/tecnico'));
router.use('/', require('../../controllers/observacion'));
router.use('/', require('../../controllers/categoria'));
router.use('/', require('../../controllers/catecons'));
router.use('/', require('../../controllers/socio'));
router.use('/', require('../../controllers/zona'));
router.use('/', require('../../controllers/lectura'));
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;