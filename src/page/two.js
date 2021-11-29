import Icon from '../icon.js';
import ProgressBar from '@ramonak/react-progress-bar';
import './two.css';
import { useEffect, useState } from 'react';



const Two = ({socket, setPageNum}) => {
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [c, setC] = useState(0);

	useEffect(() => {
		socket.addEventListener("message", (message) => {
			if (message.action == "scroll right"){
				setA(v=>v+1);
			} else if (message.action == "o"){
				setB(v=>v+1);
			} else if (message.action == "thumbs up"){
				setC(v=>v+1);
			}
		});
	}, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			setPageNum(3);
		}
		if (b > 100){
			setB(0);
			setPageNum(3);
		}
		if (c > 100){
			setPageNum(3);
			setB(0);
		}
	},[a,b,c]);

	return (
	  <div className="container">
		<div className="one_third">
			{/* <Icon img="Ok_guide.png"/> */}
			<img src="Ok_guide.png"/>
			<ProgressBar completed={a} />
			<h2>엄지와 검지로 화면을 집어 넘기세요</h2>
		</div>

		<div className="one_third">
			{/* <Icon img="O.png"/> */}
			<img src="O.png"/>
			<ProgressBar completed={b} />
			<h2>장바구니를 비우려면 O를 만드세요</h2>
		</div>

		<div className="one_third">
			{/* <Icon img="Thumbs up.png"/> */}
			<img src="Thumbs up.png"/>
			<ProgressBar completed={c} />
			<h2>장바구니에 다 담았으면 따봉하세요</h2>
		</div>
	  </div>
	);
}

export default Two;
