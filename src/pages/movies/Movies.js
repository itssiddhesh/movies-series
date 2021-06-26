import React, { useEffect, useState } from "react";
import { BsFilm } from "react-icons/bs";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";
import TypeOf from "../../components/typeof/TypeOf";
import "./Movie.css";
import useType from "../../hooks/useType";

function Movies() {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectType, setSelectType] = useState([]);
  const [type, setType] = useState([]);
  const typeURL = useType(selectType);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${typeURL}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setValue(data.results);
        setnumOfPages(data.total_pages);
      });
  }, [page, selectType]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span className="pagetitle">
          {" "}
          <BsFilm /> Movies{" "}
        </span>
      </div>

      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TypeOf
          name="movie"
          selectType={selectType}
          setSelectType={setSelectType}
          type={type}
          setType={setType}
          setPage={setPage}
        />
      </div>
      <div className="movie">
        {value &&
          value.map((t) => (
            <SingleContent
              key={t.id}
              id={t.id}
              poster={t.poster_path}
              title={t.title || t.name}
              date={t.first_air_date || t.release_date}
              mediaType="movie"
              rating={t.vote_average}
            />
          ))}
      </div>
      <div>
        {numOfPages > 1 && (
          <CustomPagination setpage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
}

export default Movies;
