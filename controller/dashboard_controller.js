
const fetchData = async (req, res) => {
    req.user.image = req.user.image ? `${req.protocol}://${req.get("host")}${req.baseUrl}/${req.user.image}` : null;
    res.status(200).json({ message: "Data fetched successfully", user: req.user });
}

module.exports = { fetchData };