import { Checkbox, Chip } from "@material-ui/core";
import React, { useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import './TypeOf.css'

function TypeOf({ name, selectType, setSelectType, type, setType, setPage }) {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/${name}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setType(data.genres);
      });
  }, []);

  const handleAdd = (l,i) => {
    setSelectType([...selectType, i]);
    setType(
      type.filter((t) => {
        return t.id !== i.id;
      })
    );
    setPage(1);
  };

  const handleRemove=(l,i)=>{
      setSelectType(
          selectType.filter((selected)=>{return selected.id!==i.id})
      )
      setType([...type,i]);
      setPage(1);
  }

  return (
    <div className='typeof'>
        {
            type && type.map((g)=>{
                <Checkbox  />
            })
        }
        {type && <Multiselect placeholder='Select Genres!!' displayValue='name' options={type} onSelect={(list,item)=>{handleAdd(list,item)}} onRemove={(list,item)=>{handleRemove(list,item)}} />}
    </div>
  );
}

export default TypeOf;
