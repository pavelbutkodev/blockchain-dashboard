const getOwner = (address) => {
	if (address === '0xABS93d70E9813fFe62a2fCf6189F14A4ff2e8cB3') {
		return 'Paul'
	} else if (address === '0x32c93d70E9813fFe62a2fCf6189F14A4ff2e8cB3') {
		return 'Viktor'
	} else if (address === '0x12393d70E9813fFe62a2fCf6189F14A4ff2e8cB3') {
		return 'Oleg'
	}
}

export {getOwner};