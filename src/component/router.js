
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import First from "../page/first";
import Second from "../page/two";
import Third from "../page/three";

const AppRouter = ({socket}) => {
  const [pageNum, setPageNum] = useState(3);
  return (
    <Router>
	  <Routes>
		{(pageNum == 1) &&
			<Route exact path="/" element={<First socket={socket} setPageNum={setPageNum}/>}/>
		}
		{(pageNum == 2) &&
			<Route exact path="/" element={<Second socket={socket} setPageNum={setPageNum}/>}/>
		}
		{(pageNum == 3) &&
			<Route exact path="/" element={<Third socket={socket} setPageNum={setPageNum}/>}/>
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
