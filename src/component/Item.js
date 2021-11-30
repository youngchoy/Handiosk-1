import './Item.css';


function Item({name, img, count, cost}) {
	return (
	  <div className="cart_food">
		<div className="img">
			<img className="cart_food_img" src={img} alt="icon"/>
		</div>
		<div className="cart_name">
			{name}
		</div>
		<div className="cart_count">
			{count}
		</div>
		<div className="cart_cost">
			<span>₩{cost}</span>
		</div>
		<div className="cart_cost">
			<span>₩{cost * count}</span>
		</div>
	  </div>
	);
}

export default Item;
