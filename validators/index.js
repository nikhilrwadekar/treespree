
const {check} = require('express-validator');

exports.validator=[
    check('name', 'Enter a valid Name')
    .isLength({ min: 3 })
    // .trim()
    .not().isEmpty()
    // .escape(),
        
//     check('email','Enter a valid Email')
    
//     .isEmail()
//     .not().isEmpty()
//     .escape(),
    
//    check('message','Enter Message')
//     .not().isEmpty()
    // .isLength({ min: 5 })
    
    
    ];