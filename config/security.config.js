exports.ensureAuthentificated = (req, res, next) => {
    if(req.isAuthentificated()) {
        next();
    } else {
        res.status(403).redirect('/auth/signin/form');
    }
}

