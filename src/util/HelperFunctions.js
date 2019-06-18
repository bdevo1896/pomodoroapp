export function getTaskIndexFromID(list,id) {

    if(list.length > 0) {
        let index = 0;
        let found = false;
    do{
        if(list[index].id == id) {
            found = true;
        }else {
            index++;
        }
    }while(!found && index < list.length)

    return index;

    }

    return -1;
}