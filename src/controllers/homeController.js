let homePage = (req, res) => {
    return res.render("homepage.ejs");
};

module.exports = {
    homePage: homePage,
};
