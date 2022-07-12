const home_index = (req, res) => {
	res.status(200).redirect('http://localhost:3000/home')
}

module.exports = {
	home_index,
}