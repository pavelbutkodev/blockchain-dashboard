import React, {useEffect, useState} from "react";

import {getOwner} from "../../../helpers/getOwner";
import {convert} from "../../../helpers/convert";

import './KeepersInfo.scss';

const KeepersInfo = ({state}) => {

	const [addresses, setAddresses] = useState([])
	const calculateUserInfo = () => {

		let prevArray = []
		state.map((values) => {

			let checkUniqValue = !prevArray.filter((item) => item.address === values.address).length > 0

			if (checkUniqValue) {
				let allUserData = state.filter(element => element.address === values.address)
				let allWinUserData = allUserData.filter(userData => userData.buyPrice)
				let percentWinRate = (allWinUserData.length / allUserData.length) * 100
				let earnWinRate = convert(allWinUserData.reduce((accumulator, currentValue) => accumulator + +currentValue.buyPrice, 0))
				let earnStartPrices = convert(allWinUserData.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0))
				let gas = allWinUserData.reduce((accumulator, currentValue) => accumulator + +currentValue.gas, 0)
				let spend = (gas * 0.00000003).toFixed(4)
				let profit = (earnWinRate - earnStartPrices) - spend

				prevArray = [
					...prevArray,
					{
						address: values.address,
						profit: profit ? profit.toFixed(4) : profit,
						percentWinRate,
						earnWinRate,
						spend,
					}
				]
			}
		})
		setAddresses(prevArray)
	}

	useEffect(() => {
		calculateUserInfo(state)
	}, [state])

	return (
		<>
			<div className='dash-row'>
				<div className='col col-title'>
					Keeper
				</div>
				<div className='col col-title'>
					Win rate
				</div>
				<div className='col col-title'>
					Earn
				</div>
				<div className='col col-title'>
					Spent
				</div>
				<div className='col col-title'>
					Profit
				</div>
			</div>

			{addresses.map(address => (
				<div className='dash-row'>
					<div className='col'>
						{getOwner(address.address)}
					</div>
					<div className='col'>
						{address.percentWinRate || '0'} %
					</div>
					<div className='col'>
						{address.earnWinRate || '0'} ETH
					</div>
					<div className='col'>
						{address.spend || '0'} ETH
					</div>
					<div className='col'>
						{address.profit || '0'} ETH
					</div>
				</div>
			))}
		</>
	)
}

export default KeepersInfo;