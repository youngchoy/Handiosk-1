// import { useEffect, useState } from "react";
// import Icon from '../icon.js';
// import ProgressBar from "@ramonak/react-progress-bar";

// const Menupan = ({socket}) => {
// 	const [a, setA] = useState(0);
// 	const [b, setB] = useState(0);
// 	const [c, setC] = useState(0);
// 	const [d, setD] = useState(0);
// 	const [e, setE] = useState(0);


// 	const [progressList, setProgressList] = useState([0,0,0,0,0]);
// 	//Add item
// 	const addJoinPeople = (e) =>{
// 		let name = e.target.value; setProgressList([...progressList, name]);
// 	};

// 	//Delete item
// 	const RemovePeople = (e) =>{
// 		let name = e.target.value; setProgressList(progressList.filter((e)=>(e !== name)))
// 	};



// 	const Current = () =>{
// 		console.log("현재 state:", a);
// 	}

// 	useEffect(() => {
// 		socket.addEventListener("message", (message) => {
// 			if (message.data == "1"){
// 				setA(v=>v+1);
// 			} else if (message.data == "2"){
// 				setB(v=>v+1);
// 			} else if (message.data == "3"){
// 				setC(v=>v+1);
// 			} else if (message.data == "4"){
// 				setD(v=>v+1);
// 			} else if (message.data == "5"){
// 				setE(v=>v+1);
// 			}
// 		});
// 	}, []);

// 	useEffect(() => {
// 		if (a > 100){
// 			setA(0);
// 			// 첫번째 음식을 장바구니에 넣는다.
// 			order.push(menu[0]);
// 		}
// 		if (b > 100){
// 			setB(0);
// 			// 첫번째 음식을 장바구니에 넣는다.
// 			order.push(menu[1]);
// 		}
// 		if (c > 100){
// 			setC(0);
// 			// 첫번째 음식을 장바구니에 넣는다.
// 			order.push(menu[2]);
// 		}
// 		if (d > 100){
// 			setD(0);
// 			// 첫번째 음식을 장바구니에 넣는다.
// 			order.push(menu[3]);
// 		}
// 		if (e > 100){
// 			setE(0);
// 			// 첫번째 음식을 장바구니에 넣는다.
// 			order.push(menu[4]);
// 		}
// 	},[a,b,c,d,e]);

// 	return (
// 		<div className="icons">
// 			<div className="icon">
// 				<Icon img="1.png"/>
// 				<ProgressBar completed={a} />
// 			</div>
// 			<div className="icon">
// 				<Icon img="2.png"/>
// 				<ProgressBar completed={b} />
// 			</div>
// 			<div className="icon">
// 				<Icon img="3.png"/>
// 				<ProgressBar completed={c} />
// 			</div>
// 			<div className="icon">
// 				<Icon img="4.png"/>
// 				<ProgressBar completed={d} />
// 			</div>
// 			<div className="icon">
// 				<Icon img="5.png"/>
// 				<ProgressBar completed={e} />
// 			</div>
// 		</div>
// 	);
// }

// export default Menu;
