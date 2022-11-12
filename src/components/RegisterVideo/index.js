import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'

import config from "../../../config.json";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            })
        },
        clearForm() {
            setValues({})
        }
    }
}

const NEXT_PUBLIC_PROJECT_URL = process.env.NEXT_PUBLIC_PROJECT_URL
const NEXT_PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY
const supabase = createClient(
    process.env.NEXT_PUBLIC_PROJECT_URL,
    process.env.NEXT_PUBLIC_KEY,
)

// get youtube video id
function getVideoId() {
    const videoId = url.split("v=")[1]
    const ampersandPosition = videoId.indexOf("&")
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition)
    }
    return videoId
}

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    })
    const [formVisivel, setFormVisivel] = React.useState(false)

    const playlistNames = Object.keys(config.playlists)

    return (
        <StyledRegisterVideo>
            <button typew="button" className="add-video" onClick={() => setFormVisivel(true)}> + </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault()

                        // integrando o front e o back
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: formCadastro.values.playlist,
                        })
                            .then((oqueveio) => {
                                console.log(oqueveio)
                            })
                            .catch((error) => {
                                console.log(error)
                            })

                        setFormVisivel(false)
                        formCadastro.clearForm()
                    }}>
                        <div>
                            <button className="close-modal" onClick={() => setFormVisivel(false)}> x </button>

                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />

                            <select name="playlist" onChange={formCadastro.handleChange}>
                                <option key="Add Novos" value="Add Novos">Novos</option>
                                {playlistNames.map((playlistName) => {
                                    return (
                                        <option key={playlistName} value={playlistName}>{playlistName}</option>
                                    )
                                })}
                            </select>

                            <button
                                type="submit"
                            >Cadastrar</button>
                        </div>
                    </form>
                )
                : false
            }
        </StyledRegisterVideo>
    )
}
