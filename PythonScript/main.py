import cv2
import numpy as np
from cvzone.HandTrackingModule import HandDetector
from time import sleep
#===================================================

import asyncio
import websockets
import json
import hand_recog
import time
import tensorflow as tf
import keras

count = 0
# font 문제 해결
# font = ImageFont.truetype("fonts/gulim.ttc", 20)
model = keras.models.load_model('./hand_recog_model_2')

async def accept(websocket, path):
    # hand detector 정의
    detector = HandDetector(detectionCon=0.8, maxHands=1)

    # 웹캠 데이터를 받아옴
    cap_cam = cv2.VideoCapture(0)

    # 왜 해상도가 안바뀌는지는 모르겠지만 안바뀜
    cap_cam.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)  # 의미가 뭘까?
    cap_cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)  # 500x500으로 사이즈가 안바뀌면 도대체 왜 존재하는거지?

    _, hand_cam = cap_cam.read()
    # hand_cam은 3채널의 720x1280사이즈의 배열로 저장됨
    h, w = hand_cam.shape[0], hand_cam.shape[1]
    print(h, w)  # 받아오는 카메라의 가로와 높이 길이

    # variable for counting frame
    # 일정한 프레임(시간) 안에 행동이 일어나는 경우를 측정하기 위해서 프레임을 카운트하는 변수
    timer = 0
    action = "non"
    action_delay = 0
    init_point = [0,0]
    
    dummy_data = '{"action": "non", "percentage": 0}'
    packet = json.loads(dummy_data)

    while True:
        
        # 두개의 이미지를 두개의 창에서 열어서 보여주는 것은 왜인지 맥에서는 되지 않는다. 일단 캠을 띄우긴 하자.
        _, hand_cam = cap_cam.read()
        # hand_cam = cv2.flip(hand_cam, 1)

        # 손이 검출되었다면 hands에 dict객체 하나가 저장됨. 그 객체에 lmlist가 있고 거기에 좌표들이 21개가 있음
        hands, hand_cam = detector.findHands(hand_cam)

        if hands:
            # 글자 띄우기
            # cv2.putText(hand_cam, "hand!", (int(h / 2), 300), cv2.FONT_ITALIC, 3, (255, 255, 255), 2, cv2.LINE_AA)
            # 특정한 점의 좌표를 나타내는것 같은 lmList를 써먹기 위해서 저장하자.
            lm_list = hands[0]['lmList']
            fingers = detector.fingersUp(hands[0])

            # scroll을 확인하기 위한 각 관절간 거리
            length, info, hand_cam = detector.findDistance(lm_list[4], lm_list[8], hand_cam)  # 엄지와 검지 사이의 거리구하기
            length2, _, hand_cam = detector.findDistance(lm_list[8], lm_list[12], hand_cam) # 검지와 중지 사이의 거리구하기
            
            # scroll 인식
            if length < 50:
                # model을 통해서 거리가 50이하일때 o인지 ok인지 확인
                # flatten lm_list
                pred = model.predict(np.array([sum(lm_list, [])]))
                if pred > 0.9:
                    # 0.9 이상이면 ok(scroll)
                    hand_cam, action, packet, action_delay, timer, init_point = hand_recog.scroll_recog(hand_cam, action, packet, action_delay, timer, init_point, info)
                elif pred < 0.1:
                    # 0.1 이하면 o
                    packet["action"] = "o"
            # 숫자, 따봉 인식
            elif sum(fingers) > 0:
                packet, hand_cam = hand_recog.finger_num_recog(fingers, packet, hand_cam, detector, lm_list)
            else:
                packet["action"] = "non"
        else:
            # 손을 인식하지 못하면 action에 non 저장
            packet["action"] = "non"

        # ============= 요 위에서 수정할 것 ===============

        # packet이 non이 아닌 값을 가질때 이를 화면에 표시하고 packet을 전송한다.
        if packet["action"] != "non":
            cv2.putText(hand_cam, packet["action"], (int(h / 2), 300), cv2.FONT_ITALIC, 1.5, (255, 255, 255), 2, cv2.LINE_AA)
            await websocket.send(packet["action"])
            packet["action"] = "non"

        if timer > 0:
            timer += 1
        if action_delay > 0:
            action_delay -= 1

        # timer 를 표시
        cv2.putText(hand_cam, str(timer), (100, 100), cv2.FONT_ITALIC, 1.5, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(hand_cam, str(action_delay), (100, 200), cv2.FONT_ITALIC, 1.5, (0, 0, 255), 2, cv2.LINE_AA)

        # 각 action별 진행할 시간
        if action == "scroll" and timer == 120:
            timer = 0
            action = "non"
        if action == "1" and timer == 120:
            timer = 0
            action = "non"

        # imshow는 맨 마지막에 두도록 하자
        cv2.imshow('video1', hand_cam)

        # 키보드 'a' 누르면 꺼짐 'ㅁ' 은 안됨
        if cv2.waitKey(1) == ord('a'):
            break
                   

start_server = websockets.serve(accept, "127.0.0.1", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
