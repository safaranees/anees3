time=int(input())
if(time<60):
    print(0,time)
else:
    hours=time//60
    minutes=time%60
    print(hours,minutes)
