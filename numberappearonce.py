nn=int(input())
aa=list(map(int,input().split()))
b=[]
for i in aa:
  if(aa.count(i)>1):
    b.append(i)
  else:
    print(i)
