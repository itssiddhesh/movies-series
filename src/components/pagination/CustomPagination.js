import React from 'react'
import Pagination from '@material-ui/lab/Pagination';


function CustomPagination(props) {

    const handleChange=(e)=>{
        if(e.target.textContent!=''){
            props.setpage(e.target.textContent);
        }
        window.scroll(0,0);
        // console.log(typeof(e.target.textContent));
    }

    return (
        <div style={{width:'100%',display: 'flex',justifyContent: 'center',paddingTop: '15px'}} >
            <Pagination hideNextButton={true} hidePrevButton={true} count={props.numOfPages} onChange={handleChange} color="primary" />
        </div>
    )
}

export default CustomPagination;
