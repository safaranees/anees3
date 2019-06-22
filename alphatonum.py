num11=input()
kk=1
for i in range(len(num11)-1):
    ss1=num11[i]+num11[i+1]
    pp=int(ss1)
    if pp<=26 and num11[i]!="0":
        kk+=1
if kk==3:
    print(kk)
else:
    print(kk+(kk-1)//2)
