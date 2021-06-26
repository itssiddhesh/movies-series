import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css';
import { AiFillFire } from "react-icons/ai";
import CustomPagination from "../../components/pagination/CustomPagination";


function Trending() {
    const [page, setPage] = useState(1);
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setValue(data.results);
      });
  }, [page]);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "center"}}>
      <span className="pagetitle"><AiFillFire/>Trending</span>
      </div>      
      <div className="trending">
        {value &&
          value.map((t) => (
            <SingleContent
              key={t.id}
              id={t.id}
              poster={t.poster_path}
              title={t.title || t.name}
              date={t.first_air_date || t.release_date}
              mediaType={t.media_type}
              rating={t.vote_average}
            />
          ))}
      </div>
      <div className='pagination'>
      <CustomPagination setpage={setPage} numOfPages={10} />
      </div>
    </div>
  );
}

export default Trending;
