module.exports = {
  registerController: function (req, res) {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // res.send("working");
  },
};
