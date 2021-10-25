import './icon.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

// 결과
/*
	소켓통신으로 오는 메시지만큼
	카운팅이 되지않음

	버벅거림
	어디서 이상한 무한루프가 도는것 같음

	render하는 속도보다 메시지가 더 빨리옴
	=> setOne(one+1) : one에 1증가 + 그 결과를 render
	=>

	해결방법
	- 소켓통신에서 보내는 메시지를 감소시킨다. => 프레임 저하?


*/

const Icon = ({name, img, socket}) => {
	// const [one, setOne] = useState(0);
	// let count = 0;
	// let other = 0;

	// socket.addEventListener("message", (message) => {
	// 	if (message.data == "one"){
	// 		setOne(one + 1);
	// 		console.log("1이 인식됨. 누적수:", one);
	// 		//console.log("1이 인식됨. 누적수:", ++count);
	// 		//count++;
	// 	}
	// 	// else {
	// 	// 	console.log("1이 아닌것이 인식되었다.", ++other);
	// 	// }
	// 	//console.log("New message: ", message.data);
	// });

	return (
	  <div className="icon">
		<img className="icon_img" src={img} alt="icon" />
		<br />
		{/* <button onClick={ () => {setOne(one + 1)}} >plus</button>

		<h2></h2> */}
	  </div>
	);
}



Icon.propTypes = {
	// You can declare that a prop is a specific JS primitive. By default, these
	// are all optional.
	name: PropTypes.string,
	img: PropTypes.string.isRequired
};
export default Icon;
