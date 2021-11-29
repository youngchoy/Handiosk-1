import Icon from '../icon.js';
import ProgressBar from '@ramonak/react-progress-bar';
import './first.css';
import { useEffect, useState } from 'react';



const First = ({socket, setPageNum}) => {
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);

	useEffect(() => {
		socket.addEventListener("message", (message) => {
			if (message.action == "thumbs up"){
				setA(v=>v+1);
			} else if (message.action == "thumbs down"){
				setB(v=>v+1);
			}
		});
	}, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			setPageNum(2);
		}
		if (b > 100){
			setB(0);
			setPageNum(2);
		}
	},[a,b]);

	return (
	  <div className="container">
		<div className="first_title">
			<h1>손으로 모양을 만들어 시작하세요</h1>
		</div>

		<div className="first_up">
			{/* <Icon img="Thumbs up.png"/> */}
			<img src="Thumbs up.png"/>
			<ProgressBar completed={a} />
			<h2>포장하기</h2>
		</div>

		<div className="first_down">
			{/* <Icon img="Thumbs down.png" completed={b}/> */}
			<img src="Thumbs down.png"/>
			<ProgressBar completed={a} />
			<h2>매장식사</h2>
		</div>
	  </div>
	);
}

export default First;
