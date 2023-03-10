import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import "./news.css";
import data from "../data2";

function Adverts() {
  const [adverts, setadverts] = useState(data);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = adverts.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, adverts]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 6000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section2">
      <div className="section-centered">
        {adverts.map((item, itemIndex) => {
          const { id, img, name, title, description } = item;

          let position = "nextSlide";
          if (itemIndex === index) {
            position = "activeSlide";
          }
          if (
            itemIndex === index - 1 ||
            (index === 0 && itemIndex === adverts.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={id}>
              <img src={img} alt={name} className="item-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{description}</p>
            </article>
          );
        })}
        {/* <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button> */}
      </div>
    </section>
  );
}

export default Adverts;
