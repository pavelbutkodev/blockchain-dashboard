import Web3 from "web3";

const convert = (x) => {
	if (x) {
		return Web3.utils.fromWei(
			x.toString(),
			'ether'
		)
	}
}

export {convert};