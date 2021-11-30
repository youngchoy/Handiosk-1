import './two.css';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const Two = ({socket, setPageNum}) => {
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [c, setC] = useState(0);

	useEffect(() => {
		socket.addEventListener("message", (message) => {
			if (message.data == "scroll right"){
				setPageNum(3);
			} else if (message.data == "o"){
				setB(v=>v+1);
			} else if (message.data == "thumbs up"){
				setC(v=>v+1);
			}
		});
		setInterval(()=>{
			//setA(v=>(v>0) ? v-1 : v);
			setB(v=>(v>0) ? v-2 : v);
			setC(v=>(v>0) ? v-2 : v);
		}, 500);
	}, []);

	useEffect(() => {
		// if (a > 100){
		// 	setA(0);
		// 	setPageNum(3);
		// }
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
	  <div className="two">
			<div style={{ width: 180, height: 180 }} className="one_third">
				<CircularProgressbarWithChildren value={a}>
					<img style={{ width: 120, height: 120, marginTop: -5 }} src="Ok_guide.png" alt="doge" />
					<div style={{ fontSize: 12, marginTop: -5 }}>
						<strong>오른쪽으로 슬라이드</strong>
					</div>
				</CircularProgressbarWithChildren>
			</div>
				<h2>엄지와 검지로 화면을 집어 넘기세요</h2>

		<div style={{ width: 180, height: 180 }} className="one_third">
			<CircularProgressbarWithChildren value={b}>
				<img style={{ width: 120, height: 120, marginTop: -5 }} src="o.png" alt="doge" />
				<div style={{ fontSize: 12, marginTop: -5 }}>
					<strong>{b}%</strong>
				</div>
			</CircularProgressbarWithChildren>
		</div>
			<h2>장바구니를 비우려면 O를 만드세요</h2>

		<div style={{ width: 180, height: 180 }} className="one_third">
			<CircularProgressbarWithChildren value={c}>
				<img style={{ width: 120, height: 120, marginTop: -5 }} src="thumbs up.png" alt="doge" />
				<div style={{ fontSize: 12, marginTop: -5 }}>
					<strong>{c}%</strong>
				</div>
			</CircularProgressbarWithChildren>
		</div>
			<h2>장바구니에 다 담았으면 따봉하세요</h2>
	  </div>
	);
}

export default Two;
