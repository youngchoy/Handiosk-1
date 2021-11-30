import { useEffect, useState } from 'react';
import Food from '../component/Food.js';
import Item from "../component/Item.js"
import { CircularProgressbarWithChildren, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './three.css';
import { dbService } from '../firebase.js';

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
		img: "짜장면.png",
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
		img: "페퍼로니피자.png",
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
	useEffect(async() => {
		setInterval(()=>{
			setA(v=>(v>0) ? v-2 : v);
			setB(v=>(v>0) ? v-2 : v);
			setC(v=>(v>0) ? v-2 : v);
			setD(v=>(v>0) ? v-2 : v);
			setE(v=>(v>0) ? v-2 : v);
			setGood(v=>(v>0) ? v-2 : v);
			setClear(v=>(v>0) ? v-2 : v);
		}, 500);

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
				setPage(v => (v<=0) ? setPage(2) : setPage(v-1));
			} else if (message.data == "scroll right"){
				// page를 오른쪽으로 넘깁니다.
				setPage(v => (v>=2) ? setPage(0) : setPage(v+1));
			}
			else if (message.data == "scroll up"){
				// 위 카테고리로 넘깁니다.
				setCategory(v => (v<=0) ? setCategory(3) : setCategory(v-1));
			}
			else if (message.data == "scroll down"){
				// 아래 카테고리로 넘깁니다.
				setCategory(v => (v>=3) ? setCategory(0) : setCategory(v+1));
			}
		});
	  }, []);

	useEffect(() => {
		// menu == 한식, menu1 == 중식, menu2 == 음료, yangsik == 양식 => category
		var currentmenu;
		if(category == 0)
			currentmenu = menu;
		else if(category == 1)
			currentmenu = menu2;
		else if(category == 2)
			currentmenu = yangsik;
		else if(category == 3)
			currentmenu = menu3;


		if (a > 100){
			setA(0);
			if(currentmenu.length > page*5+0)	// 13  > 2번째페이지 4번째음식 == 2*5 + 3 = 12
				pushOrder(currentmenu[page * 5 + 0]);
		}
		if (b > 100){
			setB(0);
			if(currentmenu.length > page*5+1)
				pushOrder(currentmenu[page * 5 + 1]);
		}
		if (c > 100){
			setC(0);
			if(currentmenu.length > page*5+2)
				pushOrder(currentmenu[page * 5 + 2]);
		}
		if (d > 100){
			setD(0);
			if(currentmenu.length > page*5+3)
				pushOrder(currentmenu[page * 5 + 3]);
		}
		if (e > 100){
			setE(0);
			if(currentmenu.length > page*5+4)
				pushOrder(currentmenu[page * 5 + 4]);
		}
		if (clear > 100){
			setClear(0);
			// 주문현황을 비운다.
			while(order.length != 0)
				order.pop();
		}
		if (good > 100){
			resetProgress();
			setOrder(...[order]);
			setTimeout(()=>{
				// 주문현황을 비운다.
				while(order.length != 0)
					order.pop();
			},1000);
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
				{/* c:{category} <br/>
				p:{page} */}
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
				{(category==2) && yangsik.map((one, idx) => (
					(page * 5 <=idx) && (idx < 5 * (page+1)) && <Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}
				{(category==3) && menu3.map((one, idx) => (
					(page * 5 <=idx) && (idx < 5 * (page+1)) && <Food key={idx}
					name={one.name} img={one.img} cost={one.cost}/>
				))}

			</div>

			<div className="icons">
				<div className="icon">
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
			{(page == 0) ? (<div className="ablock"> 1 </div>) : (<div className="bblock"> 1 </div>)}
			{(page == 1) ? (<div className="ablock"> 2 </div>) : (<div className="bblock"> 2 </div>)}
			{(page == 2) ? (<div className="ablock"> 3 </div>) : (<div className="bblock"> 3 </div>)}
		</div>
		<div className="cart">
			<div className="cart_title">
				<div><span>장바구니🛒</span></div>
				<div style={{ width: 50, height: 50 }}>
				<CircularProgressbarWithChildren value={good}>
					<img style={{ width: 50, height: 50, marginTop: -5 }} src="thumbs up.png" alt="doge" />
					<div style={{ fontSize: 12, marginTop: -5 }}>
						<strong>{good}%</strong>
					</div>
				</CircularProgressbarWithChildren>
				</div>

				<div style={{ width: 50, height: 50}}>
				<CircularProgressbarWithChildren value={clear}>
					<img style={{ width: 50, height: 50, marginTop: -5 }} src="o.png" alt="doge" />
					<div style={{ fontSize: 12, marginTop: -5 }}>
						<strong>{clear}%</strong>
					</div>
				</CircularProgressbarWithChildren>
				</div>
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
