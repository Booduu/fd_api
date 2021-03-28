exports.ensureAuthentificated = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('pppp', req.isAuthenticated())
        next();
    } else {
        res.status(403).redirect('/auth/signin/form');
    }
}

