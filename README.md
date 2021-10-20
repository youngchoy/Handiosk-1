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

#######1page##########
<h1>asdaadsf</h1>
ICON
ICON
######################
Icon.js - 인식되어지는 아이콘 컴포넌트

#######2page##########
ICON
ICON
ICON(Dummy)
######################
Icon.js - 인식되어지는 아이콘 컴포넌트

#######3page##########
<Sidebar>
	<category />
	<category />
	<category />
	<category />
</Sidebar>
<Board>
	<Menu/>
	<Menu/>
	<Menu/>
	<Menu/>
	<Menu/>
	<PageButton>
		<button/>
		<button/>
		<button/>
	</PageButton>
</Board>
<Cart>
	<h1>
	<Item>
		<img>
		<name>
		<num>
		<quantity>
		<price>
	<Item>
	<Icon>
	<total></total>
</Cart>
<>
######################
Menu.js - 메뉴판에 담기는 메뉴 1개
	Icon.js
PageButton.js - 현재페이지를 표시

Sidebar.js - 음식 카테고리를 결정
	SideButton.js - 카테고리결정버튼

Cart.js - 장바구니 컴포넌트
	Item.js - 장바구니에 담긴 아이템
	Icon.js

#######4page##########
<h1></h1>
ICON
ICON
ICON
ICON
######################
Icon.js - 인식되어지는 아이콘 컴포넌트

#######5page##########
컴포넌트필요x
######################

7개의 컴포넌트

2page 선택창은 추후에 추가하도록 한다.


if 주먹모션을 취했을때:
	화면에 주먹을 표시
	print(a)

if 1모션을 취했을때:
	print(a)

if 1모션을 취했을때:
	print(a)

if 1모션을 취했을때:
	print(a)

if 1모션을 취했을때:
	print(a)

리액트
int 주먹변수: 0
int 1변수 0
int 2변수 0
