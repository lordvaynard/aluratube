import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/componentes/CSSReset";
import Menu from "../src/componentes/Menu";
import { StyledTimeline } from "../src/componentes/Timeline";

function HomePage() {

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex:1,
            }}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage

const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px
    }
`;
function Header() {
    return (
        <StyledHeader>
            {/* <img src="" alt="banner" /> */}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} alt="foto-perfil" />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.description}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(propriedades) {
    const playlistNames = Object.keys(propriedades.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map(function (playlistNames) {  /* não usar forEach pois precisa converter o dado */
                const videos = propriedades.playlists[playlistNames];
                console.log(playlistNames);
                console.log(videos);
                return (
                    <section>
                        <h2>{playlistNames}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} alt="" />
                                        <span>{video.title}</span>
                                    </a>
                                )
                            })};
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}
        //ao inves de escrever function utilizar => (arrow function) na frente