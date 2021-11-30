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
import { arrayOf } from 'prop-types';

// 5 * 3
// const menu = [
// 	{
// 		name: "빅맥",
// 		img: "burger.png",
// 		cost: 5900
// 	},
// 	{
// 		name: "짜장면",
// 		img: "짜장면.png",
// 		cost: 5500
// 	},
// 	{
// 		name: "김밥",
// 		img: "김밥.png",
// 		cost: 2000
// 	},
// 	{
// 		name: "피자",
// 		img: "피자.png",
// 		cost: 14000
// 	},
// 	{
// 		name: "라면",
// 		img: "라면.png",
// 		cost: 3000
// 	},
// 	//
// 	{
// 		name: "아메리카노",
// 		img: "아메리카노.png",
// 		cost: 4000
// 	},
// 	{
// 		name: "빅맥",
// 		img: "burger.png",
// 		cost: 5900
// 	},
// 	{
// 		name: "아메리카노",
// 		img: "아메리카노.png",
// 		cost: 4000
// 	},
// 	{
// 		name: "라면",
// 		img: "라면.png",
// 		cost: 3000
// 	},
// 	{
// 		name: "아메리카노",
// 		img: "아메리카노.png",
// 		cost: 4000
// 	},
// 	//
// 	{
// 		name: "빅맥",
// 		img: "burger.png",
// 		cost: 5900
// 	},
// 	{
// 		name: "짜장면",
// 		img: "짜장면.png",
// 		cost: 5500
// 	},
// 	{
// 		name: "아메리카노",
// 		img: "아메리카노.png",
// 		cost: 4000
// 	},
// 	{
// 		name: "피자",
// 		img: "피자.png",
// 		cost: 14000
// 	},
// 	{
// 		name: "라면",
// 		img: "라면.png",
// 		cost: 3000
// 	}
// ];

const menu = [
	{
		name: "김치찌개 (소)",
		img: "김치찌개.png",
		cost: 6000
	},
	{
		name: "김치찌개 (중)",
		img: "김치찌개.png",
		cost: 7000
	},
	{
		name: "김치찌개 (대)",
		img: "김치찌개.png",
		cost: 8000
	},
	{
		name: "삼겹살",
		img: "삼겹살.png",
		cost: 7500
	},
	{
		name: "목살",
		img: "목살.png",
		cost: 7800
	},
	{
		name: "된장찌개",
		img: "된장찌개.png",
		cost: 7000
	},
	{
		name: "돼지불고기",
		img: "돼지불고기.png",
		cost: 7000
	},
	{
		name: "콩나물국밥",
		img: "콩나물국밥.png",
		cost: 5500
	},
	{
		name: "감자탕",
		img: "감자탕.png",
		cost: 7000
	},
	{
		name: "김밥",
		img: "김밥.png",
		cost: 2000
	},
	{
		name: "찜닭",
		img: "찜닭.png",
		cost: 15000
	},
	{
		name: "돼지국밥",
		img: "돼지국밥.png",
		cost: 6000
	}
];

const menu2 = [
	{
		name: "짜장면",
		img: "짜장면.png",
		cost: 5500
	},
	{
		name: "짜장면(곱빼기)",
		img: "짜장면(곱빼기).png",
		cost: 6500
	},
	{
		name: "짬뽕",
		img: "짬뽕.png",
		cost: 6500
	},
	{
		name: "쟁반짜장",
		img: "쟁반짜장.png",
		cost: 9000
	},
	{
		name: "볶음밥",
		img: "볶음밥.png",
		cost: 7000
	},
	{
		name: "탕수육 (소)",
		img: "탕수육.png",
		cost: 11000
	},
	{
		name: "탕수육 (중)",
		img: "탕수육.png",
		cost: 12000
	},
	{
		name: "탕수육 (대)",
		img: "탕수육.png",
		cost: 13000
	},
	{
		name: "멘보샤",
		img: "멘보샤.png",
		cost: 13000
	},
	{
		name: "유린기",
		img: "유린기.png",
		cost: 18000
	}
];

const yangsik = [
	{
		name: "미트볼 스파게티",
		img: "미트볼 스파게티.png",
		cost: 550000
	},
	{
		name: "까르보나라",
		img: "까르보나라.png",
		cost: 550000
	},
	{
		name: "고르곤졸라",
		img: "고르곤졸라.png",
		cost: 550000
	},
	{
		name: "페퍼로니 피자",
		img: "페퍼로니 피자.png",
		cost: 550000
	},
	{
		name: "스테이크",
		img: "스테이크.png",
		cost: 550000
	},
	{
		name: "연어 스테이크",
		img: "연어 스테이크.png",
		cost: 550000
	},
	{
		name: "리코타치즈샐러드",
		img: "리코타치즈샐러드.png",
		cost: 550000
	},
	{
		name: "감자튀김 중",
		img: "감자튀김.png",
		cost: 550000
	},
	{
		name: "감자튀김 대",
		img: "감자튀김.png",
		cost: 550000
	},
	{
		name: "수제버거",
		img: "수제버거.png",
		cost: 550000
	},
];

const menu3 = [
	{
		name: "HOT 아메리카노",
		img: "뜨아.png",
		cost: 3900
	},
	{
		name: "ICE 아메리카노",
		img: "아아.png",
		cost: 3900
	},
	{
		name: "HOT 카페라떼",
		img: "아라떼.png",
		cost: 4100
	},
	{
		name: "ICE 카페라떼",
		img: "뜨라떼.png",
		cost: 4100
	},
	{
		name: "HOT 카페모카",
		img: "아모카.png",
		cost: 4400
	},
	{
		name: "HOT 카페모카",
		img: "뜨모카.png",
		cost: 4400
	},
	{
		name: "아이스티",
		img: "아이스티.png",
		cost: 2800
	},
	{
		name: "콜드브루",
		img: "콜드브루.png",
		cost: 3500
	},
	{
		name: "아인슈페너",
		img: "아인슈페너.png",
		cost: 6000
	},
	{
		name: "녹차라떼",
		img: "녹차라떼.png",
		cost: 5500
	},
]

const order = [

];

const Three = ({socket, setPageNum, setOrder}) => {
	const [fbmenu,setFbmenu] = useState([]);
	// 1~5, 휴지통
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [c, setC] = useState(0);
	const [d, setD] = useState(0);
	const [e, setE] = useState(0);
	const [clear, setClear] = useState(0);
	const [good, setGood] = useState(0);

	// 메뉴판 페이지, 카테고리 state
	const [page, setPage] = useState(0);
	const [category, setCategory] = useState(0);

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

	const resetProgress = () => {
		setA(0);
		setB(0);
		setC(0);
		setD(0);
		setE(0);
		setGood(0);
		setClear(0);
	}
	const pushOrder = (menu) => {
		var idx = order.findIndex(x => x.name === menu.name);
		// 현재 주문목록에 없음
		if(idx === -1){
			var food = menu;
			food['count'] = 1;
			order.push(food);
		}
		// 현재 주문목록에 동일물품이 존재하는 경우
		else{
			order.map((value) => {
				if(value.name === menu.name)
					value.count++;
			});
		}
	}
	const getTotal = () =>{
		var total = 0;
		order.map(one => {
			total += one.count * one.cost;
		});
		return total;
	}
	// const fuck = () => {
	// 	console.log(category);
	// }
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
			} else if (message.data == "o"){
				setClear(v=>v+1);
			} else if (message.data == "thumbs up"){
				setGood(v=>v+1);
			}
			else if (message.data == "scroll left"){
				// page를 왼쪽으로 넘깁니다. 아직max pagenum이 없다.
				if (page == 0)setPage(v=>v+2);
				else setPage(v=>v+1);
			} else if (message.data == "scroll right"){
				// page를 오른쪽으로 넘깁니다.
				if (page == 2)setPage(v=>v-2);
				else setPage(v=>v-1);
			}
			else if (message.data == "scroll up"){
				// 위 카테고리로 넘깁니다.
				if (category === 0)setCategory(4);
				else setCategory(v=>v-1);
			}
			else if (message.data == "scroll down"){
				// 아래 카테고리로 넘깁니다.
				if (category === 4)setCategory(0);
				else setCategory(v=>v+1);
			}
		});
	  }, []);

	useEffect(() => {
		if (a > 100){
			setA(0);
			pushOrder(menu[page * 5 + 0]);
		}
		if (b > 100){
			setB(0);
			pushOrder(menu[page * 5 + 1]);
		}
		if (c > 100){
			setC(0);
			pushOrder(menu[page * 5 + 2]);
		}
		if (d > 100){
			setD(0);
			pushOrder(menu[page * 5 + 3]);
		}
		if (e > 100){
			setE(0);
			pushOrder(menu[page * 5 + 4]);
		}
		if (clear > 100){
			setClear(0);
			// 주문현황을 비운다.
			while(order.length != 0)
				order.pop();
		}
		if (good > 100){
			resetProgress();
			console.log(order);
			setOrder(...[order]);
			setPageNum(v=>v+1);
		}
	},[a,b,c,d,e,clear,good]);

	return (
	<div className="container">
		<div className="up">
			<div className="sidebar">
				<div className="category">{(category == 0) ? ">" : ""}한식</div>
				<div className="category">{(category == 1) ? ">" : ""}중식</div>
				<div className="category">{(category == 2) ? ">" : ""}양식</div>
				<div className="category">{(category == 3) ? ">" : ""}음료</div>
				c:{category} <br/>
				p:{page}
			</div>

			<div className="menupan">
				{(category==0) && menu.map((one, idx) => (
					(page * 5 <=idx) && (idx < 5 * (page+1)) && <Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}
				{(category==1) && menu2.map((one, idx) => (
					(page * 5 <=idx) && (idx < 5 * (page+1)) && <Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}
				{(category==2) && menu3.map((one, idx) => (
					(page * 5 <=idx) && (idx < 5 * (page+1)) && <Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}

			</div>

			<div className="icons">
				<div className="icon">
					{/* <Icon img="1.png"/> */}
					{/* <img src="1.png"/>
					<ProgressBar completed={a} /> */}
					<div style={{ width: 65, height: 65 }}>
						<CircularProgressbarWithChildren value={a}>
							<img style={{ width: 65, height: 65, marginTop: -5 }} src="1.png" alt="doge" />
							<div style={{ fontSize: 12, marginTop: -5 }}>
								<strong>{a}%</strong>
							</div>
						</CircularProgressbarWithChildren>
					</div>
				</div>
				<div className="icon">
					{/* <Icon img="2.png"/> */}
					{/* <img src="2.png"/>
					<ProgressBar completed={b} /> */}
					<div style={{ width: 65, height: 65 }}>
						<CircularProgressbarWithChildren value={b}>
							<img style={{ width: 65, height: 65, marginTop: -5 }} src="2.png" alt="doge" />
							<div style={{ fontSize: 12, marginTop: -5 }}>
								<strong>{b}%</strong>
							</div>
						</CircularProgressbarWithChildren>
					</div>
				</div>
				<div className="icon">
					{/* <Icon img="3.png"/> */}
					{/* <img src="3.png"/>
					<ProgressBar completed={c} /> */}
					<div style={{ width: 65, height: 65 }}>
						<CircularProgressbarWithChildren value={c}>
							<img style={{ width: 65, height: 65, marginTop: -5 }} src="3.png" alt="doge" />
							<div style={{ fontSize: 12, marginTop: -5 }}>
								<strong>{c}%</strong>
							</div>
						</CircularProgressbarWithChildren>
					</div>
				</div>
				<div className="icon">
					{/* <Icon img="4.png"/> */}
					{/* <img src="4.png"/>
					<ProgressBar completed={d} /> */}
					<div style={{ width: 65, height: 65 }}>
						<CircularProgressbarWithChildren value={d}>
							<img style={{ width: 65, height: 65, marginTop: -5 }} src="4.png" alt="doge" />
							<div style={{ fontSize: 12, marginTop: -5 }}>
								<strong>{d}%</strong>
							</div>
						</CircularProgressbarWithChildren>
					</div>
				</div>
				<div className="icon">
					{/* <Icon img="5.png"/> */}
					{/* <img src="5.png"/>
					<ProgressBar completed={e} /> */}
					<div style={{ width: 65, height: 65 }}>
						<CircularProgressbarWithChildren value={e}>
							<img style={{ width: 65, height: 65, marginTop: -5 }} src="5.png" alt="doge" />
							<div style={{ fontSize: 12, marginTop: -5 }}>
								<strong>{e}%</strong>
							</div>
						</CircularProgressbarWithChildren>
					</div>
				</div>
			</div>
		</div>
		<div className="Zone">
			<div className="block">a</div>
			<div className="block">a</div>
			<div className="block">a</div>
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
							name={one.name} img={one.img} count={one.count} cost={one.cost}/>
				))}
			</div>
			<h1>총계 {getTotal()}</h1>
		</div>
	</div>
	);
}

export default Three;
