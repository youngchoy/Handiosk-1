import Icon from '../icon.js';
import ProgressBar from '@ramonak/react-progress-bar';
import './four.css';
import { useEffect, useState } from 'react';
import { dbService } from '../firebase.js';



const Four = ({setPageNum, order, takeout, orderNum, setOrderNum}) => {

	useEffect(async () => {
		setOrderNum(v=>v+1);
		dbService.collection("orders").add({
			orderNum,
			takeout,
			order,
			createdAt: Date.now(),
		})
		// 5초 뒤에 첫 화면으로 이동한다.
		// 1 2 3 4
		setTimeout(()=>setPageNum(v=>v-3), 1000 * 10);
		console.log(order);
	}, []);

	return (
	  <div className="container">
		<div className="four_title">
			<span>주문번호: {orderNum}</span>
			<span>결제완료되었습니다.</span>
			<span>잠시 후 종료됩니다.</span>

		</div>

		<div className="four_middle">

		</div>
		<div className="four_down">
			<img src="card.png"/>
		</div>
	  </div>
	);
}

export default Four;
