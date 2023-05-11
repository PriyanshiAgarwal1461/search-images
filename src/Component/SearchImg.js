import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Input, Button } from "antd";

import "./SearchImg.css"
import { ModalImg } from "./ModalImg";

export const SearchImg = () => {
    const [searchQueries, setSearchQueries] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState("")
    const [showSearchList, setShowSearchList] = useState(false)

    useEffect(() => {
        const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=8a913bc32727190d722fa16f7a0bdd56&per_page=10&format=json&nojsoncallback=1';
        axios.get(url)
            .then(response => {
                setPhotos(response.data.photos.photo);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleImageClick = (url) => {
        setIsModalOpen(true)
        setImgUrl(url)
    }

    function saveSearchQuery(query) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8a913bc32727190d722fa16f7a0bdd56&text=${query}&per_page=10&format=json&nojsoncallback=1`;
        axios.get(url)
            .then(response => {
                setPhotos(response.data.photos.photo);
            })
            .catch(error => {
                console.log(error);
            });
        console.log(searchTerm, "sghvyg")

        const existingQueries = localStorage.getItem('searchQueries');
        let queries = existingQueries ? JSON.parse(existingQueries) : [];
        if (queries.indexOf(query) === -1) {
            queries.push(query);
            setSearchQueries(queries);
            localStorage.setItem('searchQueries', JSON.stringify(queries));

        }
        setShowSearchList(false)
        setSearchTerm(query)
    }
    useEffect(() => {
        const existingQueries = localStorage.getItem('searchQueries');
        if (existingQueries) {
            setSearchQueries(JSON.parse(existingQueries));
        }
    }, []);

    const clearSearchList = () => {
        setSearchQueries([])
        localStorage.setItem('searchQueries', JSON.stringify([]))
        setShowSearchList(false)
        setSearchTerm("")
    }
const handleSearchChnage = (e) =>{
    setSearchTerm(e.target.value)
    setShowSearchList(true)
}
    return (
        <>
            <div>
                <Row className="heading">
                    Search Photos
                </Row>

                <Row className="search-box">
                    <div>
                        <Input
                            placeholder="Search images"
                            value={searchTerm}
                            type="text"
                            onClick={()=>setShowSearchList(true)}
                            onChange={(e)=>handleSearchChnage(e)}
                            className="search-img"
                            onPressEnter={() => saveSearchQuery(searchTerm)}
                        />
                        {showSearchList ? 
                       ( <div className="search-tag">
                            {searchQueries.map((searchQuery, index) => (
                                <div
                                    key={index}
                                    onClick={() => saveSearchQuery(searchQuery)}
                                >
                                    {searchQuery}
                                </div>
                            ))}
                            <div className="clearBtnBox">
                                <Button className="clearBtn" onClick={clearSearchList}>Clear</Button>

                            </div>
                        </div>) : null}
                    </div>
                </Row>
                <Row className="photo-container" onClick={()=>setShowSearchList(false)}>
                    {photos.map(photo => (
                        <img key={photo.id}
                            src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                            alt={photo.title}
                            width="200px"
                            height="200px"
                            className="photo"
                            onClick={() => handleImageClick(`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`)}
                        />
                    ))}
                </Row>
            </div>
            <ModalImg
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
            />
        </>

    )
}