
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import One from "../page/first";
import Two from "../page/two";
import Three from "../page/three";
import Four from "../page/four";

const AppRouter = ({socket}) => {
  const [pageNum, setPageNum] = useState(1);
  const [order, setOrder] = useState([]);
  return (
    <Router>
	  <Routes>
		{(pageNum == 1) &&
			<Route exact path="/" element={<One socket={socket} setPageNum={setPageNum} setOrder={setOrder}/>}/>
		}
		{(pageNum == 2) &&
			<Route exact path="/" element={<Two socket={socket} setPageNum={setPageNum} setOrder={setOrder}/>}/>
		}
		{(pageNum == 3) &&
			<Route exact path="/" element={<Three socket={socket} setPageNum={setPageNum} setOrder={setOrder}/>}/>
		}
		{(pageNum == 4) &&
			<Route exact path="/" element={<Four socket={socket} setPageNum={setPageNum} order={order}/>}/>
		}
		{/* {(pageNum == 4) &&
			<Route exact path="/">
              <four />
            </Route>
		} */}
      </Routes>
    </Router>
  );
};
export default AppRouter;
