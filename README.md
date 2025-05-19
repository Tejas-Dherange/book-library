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




    //addres book
    
import os

FILE_NAME="adress.txt"
def create_address_book():
    with open(FILE_NAME,"w") as file:
        file.write("Name, Email, phone number\n")

def view_addres_book():
    if not os.path.exists(FILE_NAME):
        print("Addrres book not found ❌")
        return
    with open(FILE_NAME,"r") as file:
        print(file.read())
        
    
def insert_record():
    name=input("enter name")
    email=input("enter email")
    phone=input("enter phone")
    with open(FILE_NAME,"a") as file:
        file.write(f"{name} {email} {phone}\n")
        

def delete_record():
    if not os.path.exists(FILE_NAME):
        print("addresboook does not exists")
        return
    name_to_delete=input("enter name")
    lines=[]
    found=False
    with open(FILE_NAME,"r") as file:
        lines=file.readlines()
    with open(FILE_NAME,"w") as file:
        for line in lines:
            if not line.startswith(name_to_delete):
                file.write(line)
            else:
                found=True
        if(found):
            print("record deleted ✅")
        else:
            print("❌ not found")
            
def modify_record():
    if not os.path.exists(FILE_NAME):
        print("address book des not exists")
        return
    name_to_modify=input("enter name")
    line=[]
    found=False
    with open(FILE_NAME,"r") as file:
        lines=file.readlines()
    with open(FILE_NAME,"w") as file:
        for line in lines:
            if line.startswith(name_to_modify):
                found=True
                email=input("enter email")
                phone=input("enter phione")
                file.write(f"{name_to_modify} {email} {phone}\n")
            else:
                file.write(line)
    if(found):
        print("record updated successfully")
    else:
        print("record not found")
if __name__=="__main__":
    while True:
        print("\n===== Address Book =====")
        print("1. Create Address Book")
        print("2. View Address Book")
        print("3. Insert Record")
        print("4. Delete a Record")
        print("5. Modify a Record")
        print("6. Exit")
        
        choice = input("Enter your choice: ")
        
        if choice == "1":
            create_address_book()
        elif choice == "2":
            view_addres_book()
        elif choice == "3":
            insert_record()
        elif choice == "4":
            delete_record()
        elif choice == "5":
            modify_record()
        elif choice == "6":
            print("👋 Exiting...")
            break
        else:
            print("❌ Invalid choice! Please try again.")
    
        
import os import sys import time 
 
def execute_with_execve():     path = "/usr/bin/python3"      argv = [path, "second.py"]     envp = os.environ 
    try: 
        os.execve(path, argv, envp)     except OSError as e: 
        print(f"Error executing command: {e}") 
        sys.exit(1) 
 
file_name = os.path.basename(__file__) 
print(f"PID: {os.getpid()} | MSG: Hello, this is inital process ({file_name}).") execute_with_execve() 
print("This line will never be executed!") 
 
 
second.py – CODE – 
import os  
file_name = os.path.basename(__file__) 
print(f"PID: {os.getpid()} | MSG: Hello, this is another process ({file_name}).") 
OUTPUT – 
  
3. Orphan Process – import os import sys import time def create_orphan():     pid = os.fork() 
 
    if pid == 0: 
        print(f"PID {os.getpid()} | Child is Running....")         for i in range(4):             print(f"Parent of this process {os.getpid()} is => {os.getppid()}")             time.sleep(2)         print(f"PID {os.getpid()} | Child is Exiting....")     else: 
        print(f"PID {os.getpid()} | Parent is Running....")         print(f"PID {os.getpid()} | Parent is Exiting....")         sys.exit(0) 
create_orphan() 
OUTPUT – 
  
4. Zombie State Process – CODE – 
import os import sys import time def create_zombie(): 
    pid = os.fork()     if pid == 0: 
        print(f"PID {os.getpid()} | Child is Running....")         print(f"PID {os.getpid()} | Child is Exiting....")     else: 
        print(f"PID {os.getpid()} | Parent is Running....")         time.sleep(10)         print(f"PID {os.getpid()} | Parent is Exiting....")         sys.exit(0) 
create_zombie() 
 


5.wait() System Call – CODE
import os  
pid = os.fork() 
if pid != 0:
    status = os.wait() 
    print("In parent process-") 
    print("Terminated child's process ID:", status[0]) 
    print("Exit status of child process:",status[1]) 
else: 
    print("In Child process-") 
    print("Process ID:", os.getpid()) 
    print("Exiting...")
    os._exit(0)
