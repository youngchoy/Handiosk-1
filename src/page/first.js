import Icon from '../icon.js';
import ProgressBar from '@ramonak/react-progress-bar';
import './first.css';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const One = ({socket, setPageNum, setOrder}) => {
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);

	useEffect(() => {
		socket.addEventListener("message", (message) => {
			if (message.data == "thumbs up"){
				setA(v=>v+1);
			} else if (message.data == "thumbs down"){
				setB(v=>v+1);
			}
		});
	}, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			//setOrder(...["Takeout"]);
			setPageNum(2);
		}
		if (b > 100){
			setB(0);
			//setOrder(...["Notakeout"]);
			setPageNum(2);
		}
	},[a,b]);

	return (
	  <div className="first">
		<div className="first_title">
			<h1>손으로 모양을 만들어 시작하세요</h1>
		</div>

		<div className="first_up">
			{/* <Icon img="Thumbs up.png"/> */}
			<img src="Thumbs up.png"/>
			<ProgressBar completed={a} />
			{/* <div style={{ width: 70, height: 70 }}>
				<CircularProgressbarWithChildren value={a}>
					<img style={{ width: 50, height: 50, marginTop: -5 }} src="1.png" alt="doge" />
					<div style={{ fontSize: 12, marginTop: -5 }}>
						<strong>{a}%</strong> mate
					</div>
				</CircularProgressbarWithChildren>;
			</div> */}
			<h2>포장하기</h2>
		</div>

		<div className="first_down">
			{/* <Icon img="Thumbs down.png" completed={b}/> */}
			<img src="Thumbs down.png"/>
			<ProgressBar completed={b} />
			<h2>매장식사</h2>
		</div>
	  </div>
	);
}

export default One;
