
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import One from "../page/first";
import Two from "../page/two";
import Three from "../page/three";
import Four from "../page/four";

const AppRouter = ({socket}) => {
  const [pageNum, setPageNum] = useState(1);
  const [takeout, setTakeout] = useState(false);
  const [orderNum, setOrderNum] = useState(0);
  const [order, setOrder] = useState([]);
  return (
    <Router>
	  <Routes>
		{(pageNum == 1) &&
			<Route exact path="/" element={<One socket={socket} setPageNum={setPageNum} setTakeout={setTakeout}/>}/>
		}
		{(pageNum == 2) &&
			<Route exact path="/" element={<Two socket={socket} setPageNum={setPageNum} setOrder={setOrder}/>}/>
		}
		{(pageNum == 3) &&
			<Route exact path="/" element={<Three socket={socket} setPageNum={setPageNum} setOrder={setOrder}/>}/>
		}
		{(pageNum == 4) &&
			<Route exact path="/" element={<Four setPageNum={setPageNum} order={order} takeout={takeout} order={order} orderNum={orderNum} setOrderNum={setOrderNum} setOrder={setOrder}/>}/>
		}
      </Routes>
    </Router>
  );
};
export default AppRouter;
