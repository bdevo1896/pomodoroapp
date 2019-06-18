import {getTaskIndexFromID} from '../../util/HelperFunctions';

function createNewId() {
    let randomNum = Math.floor(Math.random() * Math.pow(10,9));
    return 'TID'+randomNum;
}

export const taskList ={
    state: {
        list:{},
        queue:[],
        archive:{},
        accomplishments:{}
    },
    reducers: {
        createTask(state,payload) {
            const {list} = state;
            let newId = createNewId();
            const {text,difficulty,projectId} = payload;
            let date = new Date();
            const task = {
                id: newId,
                text: text,
                difficulty: difficulty,
                date: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`,
                attempts: 0,
                complete: false,
                projectId: projectId
            }

            const newList = {...list};

            newList[newId] = task;

            return {
                ...state,
                list: newList,
            };
        },

        completeTask(state,payload) {
            const {id} = payload;
            const {list,queue,accomplishments} = state;

            let completeTask = Object.assign({},list[id]);
            completeTask.complete = true;

            let newAccomplishments = {...accomplishments};

            newAccomplishments[id] = completeTask;

            let newList = {...list};

            delete newList[id];
        
            return {
                ...state,
                list: newList,
                queue: queue.filter(task => {
                    return task.id !== id;
                }),
                accomplishments: newAccomplishments
            }
        },

        tryTaskAgain(state, payload) {
            const {id} = payload;
            const {list} = state;


            let newList = {...list};
            newList[id].attempts++;

            return {
                ...state,
                list: newList
            }
        },

        updateTask(state,payload) {
            const {id,text,difficulty,projectId} = payload;
            const {list} = state;

            let newList = {...list};
            newList[id] = Object.assign({},newList[id],{
                text: text,
                difficulty: difficulty,
                projectId: projectId
            })

            return {
                ...state,
                list: newList
            }
        },

        addTaskToQueue(state,payload) {
            const {id} = payload;

            const {queue} = state;

            return Object.assign({},state, {
                queue: [...queue,{id: id}]
            })
        },

        removeTaskFromQueue(state,payload) {
            const {id} = payload;
            const {queue} = state;

            return {
                ...state,
                queue: queue.filter(task => {
                    return task.id !== id
                })
            }
        },

        sendTaskToBack(state,payload) {
            const {id} = payload;
            const {queue} = state;

            let newQueue = queue.filter(task => {
                return task.id !== id
            })

            newQueue = [...newQueue,{id: id}];

            return {
                ...state,
                queue: newQueue
            }
        },

        shiftTaskUp(state,payload) {
            const {id} = payload;
            const {queue} = state;

            const index = getTaskIndexFromID(queue,id);

            let newArray = [...queue];

            if(index - 1 >= 0) {
                let tempVal = newArray[index - 1]
                let val = newArray[index];
                newArray[index] = tempVal;
                newArray[index-1] = val;
                return Object.assign({},state,{
                    queue: [...newArray]
                });
            }else {
                return Object.assign({},state,{
                    queue: newArray
                });
            }
        },

        shiftTaskDown(state,payload) {
            const {id} = payload;
            const {queue} = state;

            const index = getTaskIndexFromID(queue,id);

            let newArray = [...queue];

            if(index + 1 < newArray.length) {
                let tempVal = newArray[index + 1]
                let val = newArray[index];
                newArray[index] = tempVal;
                newArray[index+1] = val;
                return Object.assign({},state,{
                    queue: newArray
                });
            }else {
                return Object.assign({},state,{
                    queue: newArray
                });
            }
        },

        deleteTask(state,payload) {
            const {id} = payload;
            const {list,queue,archive} = state;

            let deletedTask = Object.assign({},list[id]);
            let newList = {...list};

            delete newList[id];

            let newArchive = {...archive};

            newArchive[id] = deletedTask;

            return {
                ...state,
                list: newList,
                queue: queue.filter(task => {
                    return task.id !== id;
                }),
                archive: newArchive
            }
        },

        restoreTask(state,payload) {
            const {id} = payload;
            const {list,archive} = state;

            let restoredTask = Object.assign({},archive[id]);

            let newList = {...list};
            let newArchive = {...archive};

            newList[id] = restoredTask;

            delete newArchive[id];

            return {
                ...state,
                list: newList,
                archive: newArchive
            }
        },

        getList(state,payload) {
            return {
                ...state,
                list: payload.data
            }
        },

        getArchive(state,payload) {
            return {
                ...state,
                archive: payload.data
            }
        },

        getQueue(state,payload) {
            return {
                ...state,
                queue: payload.data
            }
        },

        getAccomplishments(state,payload) {
            return {
                ...state,
                accomplishments: payload.data
            }
        },
    },
    effects: {}
}