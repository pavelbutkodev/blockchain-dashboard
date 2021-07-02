import React, {useEffect, useState} from "react";

import contractDate from "../../../contracts/contract";
import Table from "../../UI/Table/Table";
import KeepersInfo from "../../UI/KeepersInfo/KeepersInfo";

import './Dashboard.scss';

const Dashboard = () => {

	const [state, setState] = useState(contractDate)
	const [selectValue, setSelectValue] = useState(0)
	const optionArray = [
		{
			value: 0,
			name: 'Default'
		},
		{
			value: 1,
			name: 'Last day'
		},
		{
			value: 2,
			name: 'Last week'
		},
		{
			value: 3,
			name: 'Last month'
		}
	]

	const handleChangeSelect = (e) => {
		setSelectValue(Number(e.target.value))
	}

	const sortByTime = () => {
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
	}

	useEffect(() => {
		sortByTime()
	}, [selectValue])

	return (
		<div className='dash-content'>
			<div className='dash-wrapper'>
				<select name="select" onChange={handleChangeSelect}>
					{optionArray.map(({value, name}) => <option value={value}>{name}</option>)}
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