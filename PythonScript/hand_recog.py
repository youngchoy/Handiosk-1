import cv2
import numpy as np
from cvzone.HandTrackingModule import HandDetector

def finger_num_recog(fingers, packet, hand_cam, detector, lm_list):

    length1, _, hand_cam = detector.findDistance(lm_list[4], lm_list[8], hand_cam)  # 엄지와 검지 사이의 거리구하기
    length2, _, hand_cam = detector.findDistance(lm_list[4], lm_list[16], hand_cam) # 엄지와 중지 사이의 거리
    length3, _, hand_cam = detector.findDistance(lm_list[4], lm_list[20], hand_cam) # 엄지와 약지 사이의 거리

    if sum(fingers) == 1:  # 숫자 1
        if fingers == [1, 0, 0, 0, 0]:  # 엄지 업
            # 엄지의 끝이 다른 손가락의 포인트보다 높거나 낮음을 통해 thumbs up, thumbs down을 판별
            if lm_list[4][1] < lm_list[8][1]:
                packet["action"] = "thumbs up"
            else:
                packet["action"] = "thumbs down"
        else:
            packet["action"] = "1"
    elif sum(fingers) == 2:  # 숫자 2
        packet["action"] = "2"
    elif sum(fingers) == 3:  # 숫자 3
        packet["action"] = "3"
    elif sum(fingers) == 4:  # 숫자 3
        packet["action"] = "4"
    elif sum(fingers) == 5:  # 숫자 3
        packet["action"] = "5"

    return packet, hand_cam

def scroll_recog(hand_cam, action, packet, action_delay, timer, init_point, info):

    activation_limit = 200

    cv2.putText(hand_cam, "activate", (100, 100), cv2.FONT_ITALIC, 2, (255, 255, 255), 2,
                cv2.LINE_AA)
    # print(info[4], info[5]) 엄지와 검지의 중간의 x와 y값

    if action == "scroll":
        if (init_point[0] - info[4]) < -activation_limit:
            print("scroll right")
            action = "non"
            timer = 0
            action_delay = 40  # 다음동작 시전할 때 까지의 액션딜레이
            packet["action"] = "scroll right"
        elif (init_point[0] - info[4]) > activation_limit:
            print("scroll left")
            action = "non"
            timer = 0
            action_delay = 40  # 다음동작 시전할 때 까지의 액션딜레이
            packet["action"] = "scroll left"
        elif (init_point[1] - info[5]) < -activation_limit:
            print("scroll down")
            action = "non"
            timer = 0
            action_delay = 40  # 다음동작 시전할 때 까지의 액션딜레이
            packet["action"] = "scroll down"
        elif (init_point[1] - info[5]) > activation_limit:
            print("scroll up")
            action = "non"
            timer = 0
            action_delay = 40  # 다음동작 시전할 때 까지의 액션딜레이
            packet["action"] = "scroll up"
        
        # 시작위치 원으로 찍어줌
        cv2.circle(hand_cam, (init_point[0], init_point[1]), 30, (255, 255, 255), 2)

    elif action_delay == 0:  # scroll 액션을 시작 (액션딜레이에 걸리지 않았을 경우)
        timer = 1
        action = "scroll"
        init_point = [info[4], info[5]]  # point는 x,y

    return hand_cam, action, packet, action_delay, timer, init_point