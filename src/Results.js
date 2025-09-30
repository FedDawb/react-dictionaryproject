import React, {useState, useEffect } from "react";
import Meaning from "./Meaning";

export default function Results(props) {
    const [images, setImages] = useState([]);
    
    
   useEffect(() => {
    if (!props.results) return;

    const PIXABAY_KEY = "52540992-94788d3de490286d9692178ae";
    const query = encodeURIComponent(props.results.word);


     fetch(`https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${query}&image_type=photo&per_page=3`)
      .then((res) => res.json())
      .then((data) => {
        const urls = (data.hits || []).map(hit => hit.previewURL || hit.webformatURL);
        setImages(urls);
      })
      .catch((err) => {
        console.error("Pixabay fetch error:", err);
        setImages([]);
      });
  }, [props.results]);

  if (!props.results) return null;

  return (
    <div className="Results">
        <h2>{props.results.word}</h2>

    <div className="word-images">
  {images.length > 0 ? (
    images.map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`${props.results.word} ${i + 1}`}
      />
    ))
  ) : (
    <>
      <img src="https://via.placeholder.com/100" alt="placeholder1" />
      <img src="https://via.placeholder.com/100" alt="placeholder2" />
      <img src="https://via.placeholder.com/100" alt="placeholder3" />
    </>
  )}
</div>

       {props.results.phonetics.length > 0 && (
          <h3>
            {props.results.phonetics[0].text} 
          </h3>
        )}


        {props.results.meanings.slice(0,1).map(function(meaning, index) {
          return ( 
           <div key={index}>
            <Meaning meaning={meaning} />


        {meaning.definitions.map((def, i) => (
                def.example ? (
                  <p key={i}><strong>Example:</strong> {def.example}</p>
                ) : null
              ))}

        {meaning.synonyms && meaning.synonyms.length > 0 && (
                <p>
                  <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                </p>
              )}


         </div>
          );
        })}
      </div> 
    );

    } 