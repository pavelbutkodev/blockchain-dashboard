import React, {useEffect, useState} from "react";

import './KeepersInfo.scss';
import {getOwner} from "../../../helpers/getOwner";
import {convert} from "../../../helpers/convert";

const KeepersInfo = ({state}) => {
	const [addresses, setAddresses] = useState([])
	useEffect(() => {
		let prevArray = []
		state.map((values) => {
			if (!prevArray.filter((item) => item.address === values.address).length > 0) {
				let allUserData = state.filter(element => element.address === values.address)
				let allWinUserData = allUserData.filter(userData => userData.buyPrice)
				let percentWinRate = (allWinUserData.length / allUserData.length) * 100

				let earnWinRate = convert(allWinUserData.reduce((accumulator, currentValue) => {
					return accumulator + +currentValue.buyPrice
				}, 0))

				let earnStartPrices = convert(allWinUserData.reduce((accumulator, currentValue) => {
					return accumulator + +currentValue.price
				}, 0))


				let gas = allWinUserData.reduce((accumulator, currentValue) => {
					return accumulator + +currentValue.gas
				}, 0)

				let spend = (gas * 0.00000003).toFixed(4) // gas

				let profit = (earnWinRate - earnStartPrices) - spend// - gas

				prevArray = [...prevArray,{
					address: values.address,
					percentWinRate,
					earn: earnWinRate,
					spend: spend,
					profit: profit ? profit.toFixed(4) : profit,
				}]
			}
		})
		setAddresses(prevArray)
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
						{address.earn || '0'} ETH
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