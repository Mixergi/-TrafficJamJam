# tl = int(input("목적지 까지의 거리 : ")) # m
# nl = int(input("목적지 까지온 거리 : ")) # m
sl = int(input("신호등 까지의 거리 : ")) # m
a = int(input("속력 : "))
b = int(input("제동 계수 : ")) # 승용차 1이고
c = float(input("접착 계수 : ")) # 베어 얼음의 경우 0.1 눈이있는 얼음의 경우 0.15 눈 덮인 표면의 경우 0.2 젖은 도로의 경우 0.4 건조, 보통의 경우 0.7
s =  b * ((a * 1.5) ** 2) / (254 * c * 1.5) # 제동 거리
if 15<= a <= 60:
    ss = a - 15
else:
    ss = a
print("전방",sl,"m 앞에 신호등이 있습니다")
safe = sl - s
print("안전을 위해 전방",round(safe),"m 앞에서부터 속도를 줄여주세요") # 고속도로가 아닐때
if sl > ss: # 고속도로 일때
    print("안전을 위해 안전거리를",ss,"m만큼 확보해 주세요")
# print("목적지까지",tl - nl,"m 남았습니다")