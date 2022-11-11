import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favorites";
import { videoService } from "../src/services/videoService";


function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists


    React.useEffect(() => {        
        service
            .getAllVideos()
            .then((dados) => {
                const novasPlaylists = { ...playlists }
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = []
                    }
                    novasPlaylists[video.playlist].push(video)
                })
                setPlaylists(novasPlaylists)
            })

        
    }, [])

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header banner={config.banner} />
                <Timeline searchValue={valorDoFiltro} playlists={playlists}>
                    Conteúdo
                </Timeline>
                <Favorites favorites={config.favorites} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    
    background-color: ${({theme}) => theme.backgroundLevel1};

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

    .user-info > img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    
    .user-info > div {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

`;

const StyledBanner = styled.div`
    background-image: url(${config.banner});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 300px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favorites(props) {
    const favoritesTitle = Object.keys(props.favorites)

    return (
        <StyledFavorites>
            {favoritesTitle.map((FavSectionTitle) => {
                const favorites = props.favorites[favoritesTitle];
                return (
                    <section key="Favorites">
                        <h2>{FavSectionTitle}</h2>
                        <div key={FavSectionTitle}>
                            {favorites.map((item) => {
                                return (
                                    <a key={item.url} href={item.url} target="_blank">
                                        <img className="favorites-img" src={`https://github.com/${item.user}.png`} />
                                        <span>
                                            @{item.user}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledFavorites>
    )
}
