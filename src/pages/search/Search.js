import React, { useEffect, useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Tabs, Tab } from "@material-ui/core";
import { SearchSharp } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/core/styles";
import CustomPagination from "../../components/pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

function Search() {
  const [value, setvalue] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const handleSearch = () => {
    //   console.log(txt)
    fetch(
      `https://api.themoviedb.org/3/search/${value ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${search}&page=${page}&include_adult=false`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResult(data.results);
        setNumOfPages(data.total_pages);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    handleSearch();
  }, [value, page]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* <span className='pagetitle'><FaSearchengin/>Search</span> */}
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            required={true}
            color="secondary"
            placeholder="Search for Content"
            fullWidth={true}
            id="filled-basic"
            label="Search"
            variant="filled"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            <SearchSharp />
          </Button>
        </div>

        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="secondary"
          onChange={(e, t) => {
            setvalue(t);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Movies" />
          <Tab style={{ width: "50%" }} label="Series" />
        </Tabs>
      </ThemeProvider>
      <div className="movie">
        {result &&
          result.map((t) => (
            <SingleContent
              key={t.id}
              id={t.id}
              poster={t.poster_path}
              title={t.title || t.name}
              date={t.first_air_date || t.release_date}
              mediaType={value ? "tv" : "movie"}
              rating={t.vote_average}
            />
          ))}
        {search &&
          !result &&
          (value ? <h2>Series Not Found</h2> : <h2>Movies Not Found</h2>)}
      </div>
      <div>
        {numOfPages > 1 && (
          <CustomPagination setpage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
}

export default Search;
