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

function Icon({name, img, socket}) {
	const [one, setOne] = useState(0);



	socket.addEventListener("message", (message) => {
		if (message.data == "1"){
			setOne(one + 1);
			console.log("1이 인식됨. 누적수:", one);
		}
		//console.log("New message: ", message.data);
	});

	return (
	  <div className="icon">
		<img className="icon_img" src={img} alt="icon" />
		<br />
		<button onClick={ () => {setOne(one + 1)}} >plus</button>

		<h2>{one}</h2>
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
