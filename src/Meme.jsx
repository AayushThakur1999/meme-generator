import { useEffect, useState } from 'react'

const Meme = () => {
	const [memes, setMemes] = useState([])
	const [data, setData] = useState({
		topText: "One does not simply",
		bottomText: "walks into mordor",
		url: "https://i.imgflip.com/1bij.jpg"
	})

	useEffect(() => {
		async function getMemes() {
			const response = await fetch('https://api.imgflip.com/get_memes')
			const json = await response.json()
			setMemes(json.data.memes)
		}
		getMemes()
	}, [])

	function getMemeImg() {
		let num = Math.floor(Math.random() * 100)
		setData(prevMeme => ({
			...prevMeme,
			url: memes[num].url
		}))

	}

	function changeHandler(e) {
		const { name, value } = e.target
		setData(prevMeme => ({
			...prevMeme,
			[name]: value
		}))
	}
	return (
		<main>
			<div className="form">
				<input
					type="text"
					onChange={changeHandler}
					name='topText'
					value={data.topText}
					placeholder="Top text"
					className="form--input"
				/>
				<input
					type="text"
					onChange={changeHandler}
					name='bottomText'
					value={data.bottomText}
					placeholder="Bottom text"
					className="form--input"
				/>
				<button onClick={getMemeImg} className="form--btn">Get a new meme image 🖼️</button>
			</div>
			<div className='meme'>
				<img className='meme--img' src={data.url} alt="memeImage" />
				<h2 className='meme--text top'>{data.topText}</h2>
				<h2 className='meme--text bottom'>{data.bottomText}</h2>
			</div>
		</main>
	)
}

export default Meme 