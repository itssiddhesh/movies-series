// import { Badge } from '@material-ui/core';
import React from "react";
import { img_300, unavailable } from "../../Config";
import "./SingleContent.css";
import Badge from "react-bootstrap/Badge";
import ContentModal from "../ContentModal/ContentModal";

function SingleContent({id, poster, title, date, mediaType, rating}) {

  return (
    <ContentModal mediaType={mediaType} id={id} rating={rating}>
      <Badge
        style={
          rating >= 6
            ? {
                color: 'greenyellow',
                fontFamily: "serif",
                fontWeight: "bold",
                backgroundColor: "rgb(39, 39, 39)",
                display: "flex",
                justifyContent: "center",
                width: "15%",
                borderRadius: "10px",
                margin: '2px'
              }
            : {
                color: 'red',
                fontFamily: "serif",
                fontWeight: "bold",
                backgroundColor: "rgb(39, 39, 39)",
                display: "flex",
                justifyContent: "center",
                width: "15%",
                borderRadius: "10px",
                margin: '2px'
              }
        }
        variant="danger"
      >
        {rating}
      </Badge>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subtitle">
        {mediaType === "tv" ? "Series" : "Movie"}
        <span className="subtitle">{date}</span>
      </span>
    </ContentModal>
  );
}

export default SingleContent;
