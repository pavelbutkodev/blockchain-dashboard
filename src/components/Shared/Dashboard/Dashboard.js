import React, {useEffect, useState} from "react";

import contractDate from "../../../contracts/contract";

import './Dashboard.scss';
import Table from "../../UI/Table/Table";
import KeepersInfo from "../../UI/KeepersInfo/KeepersInfo";

const Dashboard = () => {
	const [state, setState] = useState(contractDate)
	const [selectValue, setSelectValue] = useState(0)
	const handleChangeSelect = (e) => {
		const value = +e.target.value
		setSelectValue(value)
	}

	useEffect(() => {
		const oneDay = 86400000
		const currentDate = Date.now()
		switch (selectValue) {
			case 0:
				setState(contractDate)
				break;
			case 1:
				const sortLastDay = contractDate.filter(el => (el.timestamp) - currentDate < oneDay)
				setState(sortLastDay)
				break;
			case 2:
				const sortLastWeek = contractDate.filter(el => (el.timestamp) - currentDate < (oneDay * 7))
				setState(sortLastWeek)
				break;
			case 3:
				const sortLastMount = contractDate.filter(el => (el.timestamp) - currentDate < (oneDay * 30))
				setState(sortLastMount)
				break;
			default:
				break;
		}
	}, [selectValue])

	return (
		<div className='dash-content'>
			<div className='dash-wrapper'>
				<select name="select" onChange={handleChangeSelect}>
					<option value={0}>Default</option>
					<option value={1}>Last day</option>
					<option value={2}>Last week</option>
					<option value={3}>Last month</option>
				</select>

				<Table state={state}/>
			</div>

			{selectValue ? <div className='keepers-info-wrapper'>
				<KeepersInfo state={state}/>
			</div> : null}
		</div>
	)
}

export default Dashboard;