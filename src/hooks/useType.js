import React from 'react'

function useType(selectedType) {

    if(selectedType.length<1){
        return '';
    }else{
        var ids = selectedType.map((t)=>{
            return t.id;
        })
        return ids.reduce((acc,cur)=>{
            return acc+','+cur
        })
    }
}

export default useType
