import './Item.css';


function Item({name, img, cost}) {
	return (
	  <div className="cart_food">
		<div className="img">
			<img className="cart_food_img" src={img} alt="icon"/>
		</div>
		<div className="cart_name">
			{name}
		</div>
		<div className="cart_count">
			1
		</div>
		<div className="cart_cost">
			<span>₩{cost}</span>
		</div>
	  </div>
	);
}

export default Item;
