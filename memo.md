# 10/8(금) 18:34

- Name exports 방식
export default name;을 사용했을땐
import name from "디렉토리위치";
=> 한 개의 파일에서 여러 컴포넌트 export가능
=> import시, 이름이 같아야함

- Default exports 방식
export default name;을 사용했을땐
import name from "디렉토리위치";
=> 한 개의 파일에서 한 컴포넌트만 export가능
=> import시, 이름이 같을 필요 x

https://colinricardo.substack.com/p/named-export-vs-default-export

# 10/17(일) 19:33

- 가상환경 접속할 때 까먹을까봐 적어놓는다.
conda env list   :   가상환경 목록
conda create -n 가상환경이름 python==3.7   :  파이썬 3.7버전인 가상환경 생성
conda activate 가상환경이름   :   선택한 가상환경 열기

pip install jupyter notebook
jupyter notebook

# 10/17(일) 19:49

- VSC 터미널에서 가상환경(two)접속 후 파이썬실행결과와 일반터미널에서의 결과가 다르다;; 왜지?
- 두 환경에서 각각 파이썬 버전을 비교해서보니 다른 결과가 나온다;; VSC에서 가상환경접속에 문제아 있는듯..?
- 애초에 왜 React에서 socketio서버를 못쓰게 하는걸까...

# 10/20(수) 20:06

깃에다가 push를 하는데 PythonScript가 서브모듈처리되어 업로드되었다.
git안에서 git을 보내면 이런일이 발생하는데 서브모듈의 .git만 지운다고 처리되는게 아닌가보다.
- git rm --cached ./PythonScript
