import Icon from '../icon.js';
import ProgressBar from '@ramonak/react-progress-bar';
import './first.css';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const One = ({socket, setPageNum, setTakeout}) => {
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
		setInterval(()=>{
			setA(v=>(v>0) ? v-2 : v);
			setB(v=>(v>0) ? v-2 : v);
		}, 500)
	}, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			setTakeout(true);
			setPageNum(2);
		}
		if (b > 100){
			setB(0);
			setTakeout(false);
			setPageNum(2);
		}
	},[a,b]);

	return (
	  <div className="first">
		<div className="first_title">
			<h1>손으로 모양을 만들어 시작하세요</h1>
		</div>

		<div className="first_up">
			<div style={{ width: 150, height: 150 }}>
				<CircularProgressbarWithChildren value={a}>
					<img style={{ width: 100, height: 100, marginTop: -5 }} src="thumbs up.png" alt="doge" />
					<div style={{ fontSize: 20, marginTop: -5 }}>
						<strong>{a}%</strong>
					</div>
				</CircularProgressbarWithChildren>
			</div>
			<h2>포장하기</h2>
		</div>

		<div className="first_down">
			<div style={{ width: 150, height: 150 }}>
				<CircularProgressbarWithChildren value={b}>
					<img style={{ width: 100, height: 100, marginTop: -5 }} src="thumbs down.png" alt="doge" />
					<div style={{ fontSize: 20, marginTop: -5 }}>
						<strong>{b}%</strong>
					</div>
				</CircularProgressbarWithChildren>
			</div>
			<h2>매장식사</h2>
		</div>
	  </div>
	);
}

export default One;
