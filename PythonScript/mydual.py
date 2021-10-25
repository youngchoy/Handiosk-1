import cv2
import numpy as np
import socket
import websocket
from cvzone.HandTrackingModule import HandDetector
from PIL import ImageFont, Image, ImageDraw
from time import sleep
#===================================================

import asyncio
import websockets

count = 0
# font 문제 해결
# font = ImageFont.truetype("fonts/gulim.ttc", 20)

async def accept(websocket, path):
    # hand detector 정의
    detector = HandDetector(detectionCon=0.8, maxHands=1)

    # 웹캠 데이터를 받아옴
    cap_cam = cv2.VideoCapture(0)

    # 왜 해상도가 안바뀌는지는 모르겠지만 안바뀜
    cap_cam.set(cv2.CAP_PROP_FRAME_WIDTH, 500)  # 의미가 뭘까?
    cap_cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 500)  # 500x500으로 사이즈가 안바뀌면 도대체 왜 존재하는거지?

    _, hand_cam = cap_cam.read()
    # hand_cam은 3채널의 720x1280사이즈의 배열로 저장됨
    h, w = hand_cam.shape[0], hand_cam.shape[1]
    print(h, w)  # 720, 1280 아니 도대체 카메라가 어따구로 되어있는거야. 세로로 길쭉한 형태인데 잘라서 보여주는건가..?

    # variable for counting frame
    # 일정한 프레임(시간) 안에 행동이 일어나는 경우를 측정하기 위해서 프레임을 카운트하는 변수
    timer = 0
    action = "non"
    action_delay = 0

    while True:
        global count
        # 두개의 이미지를 두개의 창에서 열어서 보여주는 것은 왜인지 맥에서는 되지 않는다. 일단 캠을 띄우긴 하자.
        _, hand_cam = cap_cam.read()
        hand_cam = cv2.flip(hand_cam, 1)

        # 글자 띄우기
        # print(int(h/2), int(w/2))
        # cv2.putText(hand_cam, "h/2,w/2", (int(h/2), int(w/2)), cv2.FONT_ITALIC, 5, (0, 0, 255), 2, cv2.LINE_AA)
        # 0은 맨 위 w/2는 아래쪽에 처박혀있고, h/2는 중간쯤 되더라

        # 손이 검출되었다면 hands에 dict객체 하나가 저장됨. 그 객체에 lmlist가 있고 거기에 좌표들이 21개가 있음
        hands, hand_cam = detector.findHands(hand_cam)

        if hands:
            # 글자 띄우기
            cv2.putText(hand_cam, "hand!", (int(h / 2), 300), cv2.FONT_ITALIC, 3, (255, 255, 255), 2, cv2.LINE_AA)
            # 특정한 점의 좌표를 나타내는것 같은 lmList를 써먹기 위해서 저장하자.

            lm_list = hands[0]['lmList']
            fingers = detector.fingersUp(hands[0])

            # 숫자 및 엄지척 인식하기
            if fingers == [1, 0, 0, 0, 0]:  # 엄지척
                cv2.putText(hand_cam, "thumbs up", (int(h / 2), 700), cv2.FONT_ITALIC, 3, (255, 255, 255), 2,
                            cv2.LINE_AA)
                await websocket.send("thumbs up")
            elif sum(fingers) == 1:  # 숫자 1
                cv2.putText(hand_cam, "1", (int(h / 2), 700), cv2.FONT_ITALIC, 5, (255, 255, 255), 2, cv2.LINE_AA)
                count = count + 1
                await websocket.send("one")
                print("1을", count, "번 보냈습니다.")
            elif sum(fingers) == 2:  # 숫자 2
                cv2.putText(hand_cam, "2", (int(h / 2), 700), cv2.FONT_ITALIC, 5, (255, 255, 255), 2, cv2.LINE_AA)
                await websocket.send("2")
            elif sum(fingers) == 3:  # 숫자 3
                cv2.putText(hand_cam, "3", (int(h / 2), 700), cv2.FONT_ITALIC, 5, (255, 255, 255), 2, cv2.LINE_AA)
                await websocket.send("3")
            elif sum(fingers) == 4:  # 숫자 4
                cv2.putText(hand_cam, "4", (int(h / 2), 700), cv2.FONT_ITALIC, 5, (255, 255, 255), 2, cv2.LINE_AA)
                await websocket.send("4")
            elif sum(fingers) == 5:  # 숫자 5
                cv2.putText(hand_cam, "5", (int(h / 2), 700), cv2.FONT_ITALIC, 5, (255, 255, 255), 2, cv2.LINE_AA)
                await websocket.send("5")

            # scroll
            length, info, hand_cam = detector.findDistance(lm_list[4], lm_list[8], hand_cam)  # 엄지와 검지 사이의 거리구하기
            length2, info2, hand_cam = detector.findDistance(lm_list[8], lm_list[12], hand_cam)
            if length < 50 and length2 > 50:
                cv2.putText(hand_cam, "activate", (int(h / 2), 600), cv2.FONT_ITALIC, 2, (255, 255, 255), 2,
                            cv2.LINE_AA)
                # print(info[4], info[5]) 엄지와 검지의 중간의 x와 y값
                # swipe action = scroll
                if action == "scroll":
                    if (init_point[0] - info[4]) < -500:
                        cv2.putText(hand_cam, "scroll right", (int(h / 2), 500), cv2.FONT_ITALIC, 3, (255, 255, 255), 3,
                                    cv2.LINE_AA)
                        print("scroll right")
                        action = "non"
                        timer = 0
                        action_delay = 40  # 다음동작 시전할 때 까지의 액션딜레이
                        await websocket.send("scroll right")
                    elif (init_point[0] - info[4]) > 500:
                        cv2.putText(hand_cam, "scroll left", (int(h / 2), 500), cv2.FONT_ITALIC, 3, (255, 255, 255), 3,
                                    cv2.LINE_AA)
                        print("scroll left")
                        action = "non"
                        timer = 0
                        action_delay = 40  # 다음동작 시전할 때 까지의 액션딜레이
                        await websocket.send("scroll left")
                elif action_delay == 0:  # scroll 액션을 시작 (액션딜레이에 걸리지 않았을 경우)
                    timer = 1
                    action = "scroll"
                    init_point = [info[4], info[5]]  # point는 x,y

        # ============= 요 위에서 수정할 것 ===============

        # scroll시 시작지점을 도넛모양으로 찍어줌
        # if action == "scroll":
        #     cv2.circle(hand_cam, (init_point[0], init_point[1]), 30, (255, 255, 255), 2)

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
