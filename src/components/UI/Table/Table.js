import React from "react";

import {convert} from "../../../helpers/convert";
import {getOwner} from "../../../helpers/getOwner";

import './Table.scss';

const Table = ({state}) => {
	const setDateCountdown = (time) => {
		const newDate = new Date(time);
		return newDate.toISOString().substr(0, 10);
	}

	return (
		<>
			<div className='dash-row'>
				<div className='col col-title'>
					Price
				</div>
				<div className='col col-title'>
					Timestamp
				</div>
				<div className='col col-title'>
					Keeper
				</div>
			</div>

			{state.map(el => (
				<div className='dash-row'>
					<div className='col'>
						{convert(el.price)} ETH
					</div>
					<div className='col'>
						{setDateCountdown(el.timestamp)}
					</div>
					<div className='col'>
						{getOwner(el.address)}
					</div>
				</div>
			))}
		</>
	)
}

export default Table;
