import { useEffect, useState } from 'react';
import Food from '../component/Food.js';
import './three.css';

const menu = [
	{
		name: "빅맥",
		img: "burger.png",
		cost: 5900
	},
	{
		name: "짜장면",
		img: "짜장면.png",
		cost: 5500
	},
	{
		name: "김밥",
		img: "김밥.png",
		cost: 2000
	},
	{
		name: "피자",
		img: "피자.png",
		cost: 14000
	},
	{
		name: "라면",
		img: "라면.png",
		cost: "3000"
	},
];

const order = [

];

const Menupan = ({socket}) => {
	const [one, setOne] = useState(0);

	const Current = () =>{
		console.log("현재 state:", one);
	}

	useEffect(() => {
		socket.addEventListener("message", (message) => {
			if (message.data == "one"){
				setOne(v=>v+1);
			}
		});
	  }, []);

	return (
	<div className="container">
		<div className="up">
			<div className="sidebar">
				<h1>I'm side bar~</h1>
			</div>

			<div className="menupan">
				{menu.map((one, idx) => (
					<Food key={idx} idx={idx+1}
					name={one.name} img={one.img} cost={one.cost}/>
				))}
				<span>1이 인식된 횟수: {one}</span>
				<button onClick={() => setOne(v=>v+1)}>증가</button>
				<button onClick={Current}>현재 값 출력</button>
				<button>1</button>
				<button>2</button>
				<button>3</button>

			</div>
		</div>

		<div className="cart">
			<h1>장바구니🛒</h1>
		</div>
	</div>
	);
}

export default Menupan;
