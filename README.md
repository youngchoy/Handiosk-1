# Handiosk
손동작을 이용해 조작하는 키오스크

## require
- python 3.7.9(3.8이상에서는 동작불가)
- node js

- 실행법

```shell
# 전체적인 실행방법
- 3.7버전의 파이썬 가상환경 생성
- 메인 폴더에서 npm install
- 파이썬 가상환경에서 PythonScript 폴더 내의 main.py실행
- 메인폴더에서 npm start로 리액트 앱 실행

# 준비
- 해당 폴더에서 Npm install
- 파이썬 3.7.9 가상환경 세팅(가능하다면 source venv/bin/activate 명령어로 venv 폴더에 있는 가상환경 사용)
<br/><br/><b>가상환경 생성및 진입 Mac</b>
- python3.7 -m venv venv2 로 python3.7기반 가상환경 생성
- source venv2/bin/activate 명령어로 가상환경 진입
<br/><br/><b>가상환경 생성및 진입 Windows</b>
- anaconda를 이용하여 python3.7가상환경 생성 후 진입
<br/><br/><b>파이썬 패키지 일괄설치</b>
- pip3 install -r requirements.txt 명령어로 패키지 한번에 설치가능
- 만일 파이썬 수동설치시 호환성 문제로 인해 mediapipe 라이브러리는 0.8.8로 설치해야한다(라즈베리파이의 경우 mediapipe-rpi4로 설치해야한다.)

# 실행
- mydual.py를 실행시켜 백엔드(서버) 실행
- npm start를 통해 React앱 실행
- 둘의 통신이 성공적으로 완료되었다면 파이썬에서 카메라를 통해 영상신호를 받기 시작하고 정상동작한다.
```



- UI설명
https://docs.google.com/presentation/d/1nuu8POCD7p5hgFlNHkuyuHurJmnfLyMw/edit#slide=id.p1

- 컴포넌트 설계
https://docs.google.com/presentation/d/1EyBQ6LSp32Pof8DIu5hz2ijBQovy7_2p/edit#slide=id.p1
