def fcfs(process):
    process = sorted(process.items(),key= lambda kv: kv[1]['arrivingtime'])
    ans = {}
    currenttime=0
    for p in process:
        if(currenttime<p[1]['arrivingtime']):
            currenttime=p[1]['arrivingtime']
        currenttime = currenttime+p[1]['burstTime']
        turnaroundtime = currenttime - p[1]['arrivingtime']
        waitingtime = turnaroundtime - p[1]['burstTime']
        ans[p[0]]= {'turnaround time': turnaroundtime, 'waiting time': waitingtime, 'currenttime': currenttime}
    return ans

def processExecv(process, currentime,ans,processlist):
    process = sorted(process, key=lambda kv: (kv[1]['burstTime']))
    processArrival = process[0][1]['arrivingtime']
    processbursttime = process[0][1]['burstTime']
    if currentime < processArrival:
        currentime= processArrival
    currentime += processbursttime
    turnaround = currentime - processArrival
    waiting = turnaround - processbursttime
    ans[process[0][0]] = {'turnaround time': turnaround, 'waiting time': waiting, 'currenttime': currentime}
    processlist[process[0][0]] = True
    return ans,currentime,processlist

def sjf(process):
    process = sorted(process.items(), key= lambda kv: (kv[1]['arrivingtime'], kv[1]['burstTime']))
    donetask= [ False for _ in range (len(process))]
    currenttime=0
    ans={}
    while any (not p  for p in donetask):
        p = [proc for proc in process if proc[1]['arrivingtime'] <= currenttime and not donetask[proc[0]] ]
        if p:
            ans,currenttime,donetask = processExecv(p,currenttime,ans,donetask) 
        else:
            currenttime+=1
    return ans



process={0:{'arrivingtime':0,'burstTime':2}, 1:{'arrivingtime':3,'burstTime':4}, 2:{'arrivingtime':5,'burstTime':3}, 3:{'arrivingtime':5,'burstTime':1}, 4:{'arrivingtime':4,'burstTime':3}}
process = {
    0: {'arrivingtime': 2, 'burstTime': 1},
    1: {'arrivingtime': 1, 'burstTime': 3},
    2: {'arrivingtime': 1, 'burstTime': 2}
}
for j in process:
    print(j,process[j])
ans=sjf(process)
print()
for i in ans:
    print(i,ans[i])
