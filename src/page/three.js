import { useEffect, useState } from 'react';
import Food from '../component/Food.js';
import Item from "../component/Item.js"
import Icon from '../icon.js';
import ProgressBar from "@ramonak/react-progress-bar";
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

const Third = ({socket}) => {
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [c, setC] = useState(0);
	const [d, setD] = useState(0);
	const [e, setE] = useState(0);


	const [progressList, setProgressList] = useState([0,0,0,0,0]);
	//Add item
	const addJoinPeople = (e) =>{
		let name = e.target.value; setProgressList([...progressList, name]);
	};

	//Delete item
	const RemovePeople = (e) =>{
		let name = e.target.value; setProgressList(progressList.filter((e)=>(e !== name)))
	};



	const Current = () =>{
		console.log("현재 state:", a);
	}

	useEffect(() => {
		socket.addEventListener("message", (message) => {
			console.log(message);
			if (message.action == "1"){
				setA(v=>v+1);
			} else if (message.action == "2"){
				setB(v=>v+1);
			} else if (message.action == "3"){
				setC(v=>v+1);
			} else if (message.action == "4"){
				setD(v=>v+1);
			} else if (message.action == "5"){
				setE(v=>v+1);
			}
		});
	  }, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[0]);
		}
		if (b > 100){
			setB(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[1]);
		}
		if (c > 100){
			setC(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[2]);
		}
		if (d > 100){
			setD(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[3]);
		}
		if (e > 100){
			setE(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[4]);
		}
	},[a,b,c,d,e]);

	return (
	<div className="container">
		<div className="up">
			<div className="sidebar">
				<h1>I'm side bar~</h1>
				<button>1번 카테고리</button>
				<button>2번 카테고리</button>
				<button>3번 카테고리</button>
			</div>

			<div className="menupan">
				{menu.map((one, idx) => (
					<Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}
				{/* <h5>1이 인식된 횟수: {a}</h5>
				<h5>2이 인식된 횟수: {b}</h5>
				<h5>3이 인식된 횟수: {c}</h5>
				<h5>4이 인식된 횟수: {d}</h5>
				<h5>5이 인식된 횟수: {e}</h5> */}

				{/* <button onClick={() => setA(v=>v+1)}>1 수동증가</button>
				<button onClick={Current}>현재 값 출력</button> */}
				<button>1</button>
				<button>2</button>
				<button>3</button>
			</div>
			{/* <Menu /> */}
			<div className="icons">
				<div className="icon">
					{/* <Icon img="1.png"/> */}
					<img src="1.png"/>
					<ProgressBar completed={a} />
				</div>
				<div className="icon">
					{/* <Icon img="2.png"/> */}
					<img src="2.png"/>
					<ProgressBar completed={b} />
				</div>
				<div className="icon">
					{/* <Icon img="3.png"/> */}
					<img src="3.png"/>
					<ProgressBar completed={c} />
				</div>
				<div className="icon">
					{/* <Icon img="4.png"/> */}
					<img src="4.png"/>
					<ProgressBar completed={d} />
				</div>
				<div className="icon">
					{/* <Icon img="5.png"/> */}
					<img src="5.png"/>
					<ProgressBar completed={e} />
				</div>
			</div>
		</div>

		<div className="cart">
			<h1>장바구니🛒</h1>
			{order.map((one, idx) => (
					<Item key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
			))}
		</div>
	</div>
	);
}

export default Third;
