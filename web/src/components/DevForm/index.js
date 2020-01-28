import React, { useState, useEffect } from 'react'
//import './styles.css'

function DevForm({ onSubmit }) {


    const [latitude, setLatitude] = useState('')//é um set tipo um get e set do java
    const [longitude, setLongitude] = useState('')
    const [github_username, setGitHubusername] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords//acessando valores específicos do retorno da funçao
                setLongitude(longitude)
                setLatitude(latitude)
                console.log(position)
            },
            (err) => {
                console.log(err)
            },
            {
                timeout: 3000
            }
        )
    }, [])

    async function handleSubmit(e) {

        e.preveventDefault();
        await onSubmit({//essa função esta enviando para api do backend os dados coletados no formulário do front web atrave´s do método post
            github_username,
            longitude,
            latitude,
            techs
        });
        setGitHubusername('')
        setTechs('')
    }

    return (

        <form onSubmit={handleSubmit}>

            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGitHubusername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
            </div>


            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="Latitude">Latitude</label>
                    <input type="number"
                        name="Latitude"
                        id="Latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="Longitude">Longitude</label>
                    <input type="number"
                        name="Longitude"
                        id="Longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>

    );
}
export default DevForm;