import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { img_500, unavailableLandscape } from "../../Config";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@material-ui/core";
import "./ContentModal.css";
import useString from "../../hooks/useString";
import { BsDownload } from "react-icons/bs";
import { Badge } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    backgroundColor: "rgb(74, 107, 104)",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({ mediaType, id, rating, children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [string, setstring] = useState("");
  const [genre, setGenre] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setContent(data);
        if(data.id){
          setstring(data.name || data.title);
        setGenre(data.genres);
        }
      });

    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.results){
          setVideo(data.results[0]?.key)
        }
      });
  }, []);

  var url = useString(string.toString());

  return (
    <div>
      <div className="media" type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="contentmodal">
                <img
                  className="content-portrait"
                  alt={content.name || content.title}
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailableLandscape
                  }
                />
                <img
                  className="content-landscape"
                  alt={content.name || content.title}
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailableLandscape
                  }
                />
                <div className="content-about">
                  <span
                    className="content-title"
                    style={{ objectFit: "contain" }}
                  >
                    {content.name || content.title}
                    <span>&nbsp;</span>(
                    {(
                      content.release_date ||
                      content.first_air_date ||
                      "....."
                    ).substring(0, 4)}
                    )
                  </span>
                  {genre && (
                    <div className="genres">
                      {genre.map((g) => (
                        <Badge
                          style={{
                            padding: "6px",
                            backgroundColor: "rgb(39, 39, 39)",
                            marginTop: "8px",
                            marginRight: "2px",
                            marginLeft: "2px",
                            borderRadius: "10px",
                            color: "aqua",
                          }}
                        >
                          {g.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  {
                    <Badge
                      style={
                        rating > 6
                          ? { color: "greenyellow",fontWeight: "bold",
                          display: "flex",
                          justifyContent: "center",
                          fontFamily: "serif",
                          width: "5%",
                          borderRadius: "10px",
                          margin: "2px",
                          backgroundColor: "black",
                          alignSelf: 'center' }
                          : { color: "red" ,fontWeight: "bold",
                          display: "flex",
                          justifyContent: "center",
                          fontFamily: "serif",
                          width: "5%",
                          borderRadius: "10px",
                          margin: "2px",
                          backgroundColor: "black",
                          alignSelf: 'center'}
                      }
                    >
                      {rating}
                    </Badge>
                  }
                  <span className="content-des">{content.overview}</span>
                  <div></div>
                  <Button
                    variant="contained"
                    startIcon={<FaYoutube />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<BsDownload />}
                    color="primary"
                    target="__blank"
                    href={`https://1337x.to/search/${url}/1/`}
                  >
                   Torrent Download(Use VPN)
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
