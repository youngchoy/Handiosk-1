import { useEffect, useState } from 'react';
import Food from '../component/Food.js';
import Item from "../component/Item.js"
import Icon from '../icon.js';
import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './three.css';
import { dbService } from '../firebase.js';

// 5 * 3
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
	//
	{
		name: "아메리카노",
		img: "아메리카노.png",
		cost: 4000
	},
	{
		name: "빅맥",
		img: "burger.png",
		cost: 5900
	},
	{
		name: "아메리카노",
		img: "아메리카노.png",
		cost: 4000
	},
	{
		name: "라면",
		img: "라면.png",
		cost: "3000"
	},
	{
		name: "아메리카노",
		img: "아메리카노.png",
		cost: 4000
	},
	//
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
		name: "아메리카노",
		img: "아메리카노.png",
		cost: 4000
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
	}
];

const order = [

];

const Three = ({socket, setPageNum, setOrder}) => {
	const [fbmenu,setFbmenu] = useState([]);
	const getMenu = async() => {
		const mymenu = await dbService.collection("menu").get();
		mymenu.forEach(doc => {
			setFbmenu((prev) => [doc.data(), ...prev]);
		});
	}
	const submitnew = async() => {
		await dbService.collection("menu").add({
			createdAt: Date.now(),
			name : "짜장면",
			cost : 6000
		})
	}
	// 1~5, 휴지통
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [c, setC] = useState(0);
	const [d, setD] = useState(0);
	const [e, setE] = useState(0);
	const [clear, setClear] = useState(0);
	const [good, setGood] = useState(0);

	// 메뉴판 페이지, 카테고리 state
	const [page, setPage] = useState(2);
	const [category, setCategory] = useState(0);

	useEffect(async() => {
		getMenu();
		// 인식되지 않고있는 것들은 0.5초마다 1씩 낮춘다.
		// setInterval(function(){
		// 	if(a > 0)
		// 		setA(v=>v-1);
		// 	if(b > 0)
		// 		setB(v=>v-1);
		// 	if(c > 0)
		// 		setC(v=>v-1);
		// 	if(d > 0)
		// 		setD(v=>v-1);
		// 	if(e > 0)
		// 		setE(v=>v-1);
		// 	if(clear > 0)
		// 		setClear(v=>v-1);
		// 	if(good > 0)
		// 		setGood(v=>v-1);
		// }, 500);

		socket.addEventListener("message", (message) => {
			console.log(message);
			if (message.data == "1"){
				setA(v=>v+1);
			} else if (message.data == "2"){
				setB(v=>v+1);
			} else if (message.data == "3"){
				setC(v=>v+1);
			} else if (message.data == "4"){
				setD(v=>v+1);
			} else if (message.data == "5"){
				setE(v=>v+1);
			} else if (message.data == "O"){
				setClear(v=>v+1);
			} else if (message.data == "thumbs up"){
				setOrder(...[order]);
			}
			else if (message.data == "scroll left"){
				// page를 왼쪽으로 넘깁니다. 아직max pagenum이 없다.
				if (page == 0)setPage(2);
				else setPage(v=>v+1);
			} else if (message.data == "scroll right"){
				// page를 오른쪽으로 넘깁니다.
				if (page == 2)setPage(0);
				else setPage(v=>v-1);
			}
			else if (message.data == "scroll up"){
				// 위 카테고리로 넘깁니다.
				if (page == 0)setPage(2);
				else setPage(v=>v+1);
			}
			else if (message.data == "scroll down"){
				// 아래 카테고리로 넘깁니다.
				if (page == 2)setPage(0);
				else setPage(v=>v-1);
			}
		});
	  }, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[page * 5 + 0]);
		}
		if (b > 100){
			setB(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[page * 5 + 1]);
		}
		if (c > 100){
			setC(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[page * 5 + 2]);
		}
		if (d > 100){
			setD(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[page * 5 + 3]);
		}
		if (e > 100){
			setE(0);
			// 첫번째 음식을 장바구니에 넣는다.
			order.push(menu[page * 5 + 4]);
		}
		if (clear > 100){
			setClear(0);
			// 주문현황을 비운다.
			order = [];
		}
		if (good > 100){
			setGood(0);
			setPageNum(4);
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
					(page * 5 <=idx) && (idx < 5 * (page+1)) && <Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}
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
					{/* <div style={{ width: 65, height: 65 }}>
						<CircularProgressbarWithChildren value={a}>
							<img style={{ width: 65, height: 65, marginTop: -5 }} src="1.png" alt="doge" />
							<div style={{ fontSize: 12, marginTop: -5 }}>
								<strong>{a}%</strong> mate
							</div>
						</CircularProgressbarWithChildren>;
					</div> */}
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
			<div className="cart_title">
				<div><span>장바구니🛒</span></div>
				<img src="thumbs up.png"/>
				<ProgressBar completed={good} />

				<img src="O.png"/>
				<ProgressBar completed={clear} />
			</div>
			<div>
				{order.map((one, idx) => (
						<Item key={idx}
							name={one.name} img={one.img} cost={one.cost}/>
				))}
			</div>
			<h1>총계</h1>
		</div>
	</div>
	);
}

export default Three;
