import Icon from '../icon.js';
import ProgressBar from '@ramonak/react-progress-bar';
import './four.css';
import { useEffect, useState } from 'react';
import { dbService } from '../firebase.js';



const Four = ({socket, setPageNum, order}) => {

	useEffect(async () => {
		dbService.collection("orders").add({
			order,
			createdAt: Date.now(),
		})
		// 5초 뒤에 첫 화면으로 이동한다.
		//setTimeout(setPageNum(v=>v-3), 1000 * 6);
		console.log(order);
	}, []);

	return (
	  <div className="container">
		<div className="four_title">
			<span>결제중입니다...</span>
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
